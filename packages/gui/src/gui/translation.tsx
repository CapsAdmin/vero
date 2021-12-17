import { Setting } from "@vero/util/settings"
import { Button } from "@frontend/gui/components/interactive/button"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { useTheme } from "@vero/gui-theme"
import { Text } from "@frontend/gui/typography"
import English from "@frontend/languages/en.json"
import Norwegian from "@frontend/languages/no.json"
import { Observer } from "@vero/util/observer"
import { CopyToClipboard } from "@vero/util/other"
import { storageGetItem, storageSetItem } from "@vero/util/storage"
import moment from "moment"
import "moment/locale/nb"
import React, { ReactNode, useState, useEffect } from "react"
import { Showcase } from "./showcase"

export const autosize = require("autosize")
export const HumanizeDuration = require("humanize-duration")

export const languageSetting = Setting<"en" | "no" | "auto">("language", "auto")

const Languages = {
	en: English,
	no: Norwegian,
	nb: Norwegian,
	"nb-NO": Norwegian,
	"no-NO": Norwegian,
}

export const editTranslationState = new Observer(false)

const getUserLanguage = () => {
	const nav = navigator as any
	return (
		(nav.languages && nav.languages[0]) || // Chrome / Firefox
		nav.language || // All browsers
		nav.userLanguage
	) // IE <= 10
}

const GetCurrentTranslation = () => {
	let lang = languageSetting.value

	if (lang === "auto") {
		let lang = getUserLanguage() as keyof typeof Languages
		if (Languages[lang]) {
			return Languages[lang]
		}
		return Languages["en"]
	}

	return Languages[lang]
}

export const FallbackTranslate = (context: string, str: string, fallback: ReactNode): ReactNode => {
	const lang = GetCurrentTranslation() as { [key: string]: { [key: string]: string } }

	return lang[context] && lang[context][str] ? lang[context][str] : fallback
}

const EditableText = (props: { strong?: boolean; translationKey: string; env: { [key: string]: string }; args: ReactNode[]; onStartEditing: () => void }) => {
	const [hack, setHack] = useState(0)
	const [editMode, setEditMode] = useState(false)
	const translation = props.env[props.translationKey]

	const save = () => {
		storageSetItem("editedTranslation", JSON.stringify(GetCurrentTranslation()))
	}

	return (
		<>
			<div
				style={{
					display: "inline",
					cursor: "help",
					background: (translation ? "rgba(0,255,0," : "rgba(255,0,0,") + (props.strong ? "0.25)" : "0.1"),
					zIndex: -1,
				}}
				onClick={(e) => {
					setEditMode(true)
					e.preventDefault()
					e.stopPropagation()
				}}
			>
				{(translation && replaceArgs(translation, props.args)) || props.translationKey}
			</div>
			{editMode ? (
				<textarea
					style={{ width: "100%", transform: "translateY(20px)" }}
					onBlur={(e) => {
						setEditMode(false)
						save()
					}}
					value={translation}
					ref={(e) => {
						if (!e) {
							return
						}

						e.focus()
						autosize(e)
						props.onStartEditing()
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.getModifierState("Shift")) {
							e.preventDefault()
							setEditMode(false)
							save()
							return false
						}
						return true
					}}
					placeholder={props.translationKey}
					onFocus={(e) => e.target.select()}
					onChange={(e) => {
						props.env[props.translationKey] = e.target.value
						setHack(hack + 1)
					}}
					onLostPointerCapture={() => {
						setEditMode(false)
						save()
					}}
				/>
			) : null}
		</>
	)
}

const replaceArgs = (str: string, args: ReactNode[]) => {
	const chunks: ReactNode[] = str.split(/{\d+}/g)
	let offset = 0
	for (let i = 0; i < args.length; i++) {
		chunks.splice(i + 1 + offset, 0, args[i])
		offset++
	}
	return chunks
}

export const GetTranslator = <T extends keyof typeof Languages.en>(context: T) => {
	let strings = GetCurrentTranslation()[context]

	if (editTranslationState.value) {
		let data = storageGetItem("editedTranslation")
		if (data) {
			strings = JSON.parse(data)[context]
			GetCurrentTranslation()[context] = strings
		}
	}

	return (key: keyof typeof strings, ...args: ReactNode[]): ReactNode => {
		const str = strings[key] as unknown as string

		if (editTranslationState.value) {
			return <EditableText translationKey={key as string} env={strings} args={args} onStartEditing={() => (editTranslationState.value = true)} />
		}

		if (!str) {
			return <EditableText strong translationKey={key as string} env={strings} args={args} onStartEditing={() => (editTranslationState.value = true)} />
		}

		return replaceArgs(str, args)
	}
}

export const useTranslation = <T extends keyof typeof Languages.en>(context: T) => {
	languageSetting.use()
	return GetTranslator<T>(context)
}

const shortEnglishHumanizer = HumanizeDuration.humanizer({
	language: "shortEn",
	languages: {
		shortEn: {
			y: () => "y",
			mo: () => "mo",
			w: () => "w",
			d: () => "d",
			h: () => "h",
			m: () => "m",
			s: () => "s",
			ms: () => "ms",
		},
	},
})
const shortNorwegianHumanizer = HumanizeDuration.humanizer({
	language: "shortNo",
	languages: {
		shortNo: {
			y: () => "å",
			mo: () => "mnd",
			w: () => "u",
			d: () => "d",
			h: () => "t",
			m: () => "m",
			s: () => "s",
			ms: () => "ms",
		},
	},
})

export function FormatTime(milliseconds: number, whitelist?: string[]) {
	if (languageSetting.value === "en") {
		return shortEnglishHumanizer(milliseconds, {
			units: whitelist || ["y", "mo", "d", "h", "m"],
			maxDecimalPoints: 0,
		})
	}

	return shortNorwegianHumanizer(milliseconds, {
		units: whitelist || ["y", "mo", "d", "h", "m"],
		maxDecimalPoints: 0,
	})
}

const conversionTable = [
	["Gt", 1000000000000000, "gigatonn"],
	["Mt", 1000000000000, "megatonn"],
	["tonn", 1000000, "tonn"],
	["kg", 1000, "kilo"],
	["g", 1, "gram"],
	["mg", 0.001, "milligram"],
	["µg", 0.000001, "microgram"],
	["ng", 0.000000001, "nanogram"],
	["pg", 0.000000000001, "picogram"],
] as const

export const FormatWeight = (grams: number, precision?: number) => {
	for (const [suffix, multiplier] of conversionTable) {
		if (grams >= multiplier) {
			return FormatNumber(grams / multiplier, precision) + " " + suffix
		}
	}

	if (grams === 0) {
		return "0 g"
	}

	return "-"
}

export function FormatNumber(num: number, precision?: number) {
	if (typeof num !== "number" || !isFinite(num)) {
		return "-"
	}

	return num.toLocaleString(languageSetting.value === "en" ? "en" : "nb", {
		minimumFractionDigits: precision || 0,
		maximumFractionDigits: precision || 0,
	})
}

export const LanguageEditToolbar = () => {
	const theme = useTheme()
	if (!editTranslationState.value) return null

	return (
		<Row
			columnAlign="center"
			rowAlign="space between"
			style={{
				background: theme.colors.card,
				minHeight: theme.sizes.S,
			}}
		>
			<Row>
				<Button
					onClick={() => {
						CopyToClipboard(JSON.stringify(GetCurrentTranslation(), null, "\t"))
					}}
				>
					Copy JSON
				</Button>
				<Button
					onClick={() => {
						storageGetItem("editedTranslation")
						editTranslationState.value = false
						setTimeout(() => {
							editTranslationState.value = true
						}, 10)
					}}
				>
					Reset
				</Button>
			</Row>
			<Text heading>Editing {languageSetting.value}</Text>
			<Button
				onClick={() => {
					editTranslationState.value = false
				}}
			>
				Exit
			</Button>
		</Row>
	)
}

export function FormatDate(date: Date, format: string) {
	let str = moment(date)
		.locale(languageSetting.value === "en" ? "en" : "no-nb")
		.format(format)
	str = str.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1))
	return str
}

export const FormatDateRange = (date: Date, range: "month" | "week" | "day") => {
	const t = GetTranslator("TimeScroll")

	if (range === "day") return FormatDate(date, "Do MMMM YYYY")
	if (range === "month") return FormatDate(date, "MMMM YYYY")

	//if (range === "week")
	return (
		<>
			{t("DateRangeWeek")} {FormatDate(date, "WW YYYY")}
		</>
	)
}

Showcase("translation", () => {
	return (
		<Column>
			<Text>{FormatNumber(8)}</Text>
			<Text>{FormatNumber(888)}</Text>
			<Text>{FormatNumber(8888)}</Text>
			<Text>{FormatNumber(88888)}</Text>
			<Text>{FormatNumber(888888)}</Text>
			<Text>{FormatNumber(8888888)}</Text>
			<Text>{FormatNumber(88888888)}</Text>
			<Text>{FormatNumber(888888888)}</Text>
			<Text>{FormatNumber(8888888888)}</Text>
		</Column>
	)
})

export const useDebugLanguageSwitcher = () => {
	useEffect(() => {
		let cb = (e: KeyboardEvent) => {
			if (document.activeElement?.nodeName === "INPUT") {
				return
			}

			if (e.key === "l") {
				if (languageSetting.value === "no") {
					languageSetting.value = "en"
				} else {
					languageSetting.value = "no"
				}
			}
		}
		window.addEventListener("keypress", cb)

		return () => {
			window.removeEventListener("keypress", cb)
		}
	}, [])
}
