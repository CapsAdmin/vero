import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { ThemeColor, useTheme } from "@frontend/gui/theme"
import { Icon } from "@frontend/gui/themes/base"
import { Text } from "@frontend/gui/typography"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { color_util } from "../../../other/colors"
import { ClickableIcon } from "./clickable-icon"
import { Input } from "./input"

type ValidateReturn = { ok: boolean; error?: undefined } | { ok: boolean; error: string }

export const TextInput = (props: {
	className?: string
	title: ReactNode
	placeholder?: string
	onTextChange?: (str: string) => void
	validate?: (str: string) => ValidateReturn | Promise<ValidateReturn>
	translateError?: (str: string) => ReactNode
	mode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
	type?: string
	color?: ThemeColor
	autoComplete?: string
	area?: boolean
	value?: string
	prefix?: string
	autoFocus?: boolean
	disabled?: boolean
	error?: string
	errorWhileTyping?: boolean
	onFinish?: (e: HTMLInputElement) => void
	renderAutoComplete?: (e: HTMLInputElement) => ReactNode
	onFocus?: () => void
	onBlur?: () => void
	children?: ReactNode
}) => {
	const [focus, setFocus] = useState(false)
	let [text, setText] = useState(props.value || "")
	let [error, setError] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const autoCompleteRef = useRef<HTMLDivElement>(null)
	const theme = useTheme()

	if (props.error) {
		error = props.error
	}

	useEffect(() => {
		const cb = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setFocus(false)
			}
		}
		if (focus) {
			window.addEventListener("keyup", cb)
		} else {
			window.removeEventListener("keyup", cb)
		}

		return () => window.removeEventListener("keyup", cb)
	}, [focus])

	const validate = async () => {
		setError("")

		if (props.validate) {
			try {
				const { ok, error } = await props.validate(text)
				if (!ok) {
					setError(error!)
				}
			} catch (err) {
				if (!(err instanceof Error)) {
					throw new Error("unknown error: " + err)
				}
				setError(err.message)
			}
		}
	}
	const value = props.value !== undefined ? props.value : text
	const inputRef = useRef<HTMLInputElement>(null)
	return (
		<Column itemPadding="XS">
			<div
				style={{
					height: theme.sizes.L + theme.sizes.S * 2,

					position: "relative",

					display: "flex",
					background: theme.colors.textBackground,
					boxShadow:
						"inset 0px 0px 0px " +
						(focus ? theme.strokeWidthThick : theme.strokeWidth) +
						"px " +
						(focus ? (error ? theme.colors.negative : theme.colors.primary) : color_util.ModifyAlpha(error ? theme.colors.negative : theme.colors.primary, props.disabled ? 0.5 : 1)),
					transition: "box-shadow 150ms cubic-bezier(0.000, 0.975, 0.695, 0.675)",
					borderRadius: theme.borderSizes.small,
				}}
			>
				<div
					style={{
						position: "absolute",
						paddingLeft: theme.sizes.XXS,
						paddingRight: theme.sizes.XXS,
						marginLeft: theme.sizes.S - theme.sizes.XXS,
						top: -theme.sizes.S,
						background: theme.colors.textBackground,
					}}
				>
					<Text
						noAlignmentHacks
						color={props.color || error ? "negative" : "textForeground"}
						weak={props.disabled}
						strong={focus}
						style={{
							whiteSpace: "nowrap",
							textShadow: "0px 0px 10px 10px " + theme.colors.textBackground,
						}}
					>
						{props.title}
					</Text>
				</div>
				<Row columnAlign="center" itemPadding="S" style={{ flex: 1 }}>
					<div></div>

					<Row columnAlign="center" itemPadding="XS" style={{ flex: 1 }}>
						{props.prefix ? (
							<Text noAlignmentHacks weak>
								{props.prefix}
							</Text>
						) : null}
						<Input
							className={props.className}
							noAlignmentHacks
							inputRef={inputRef}
							disabled={props.disabled}
							placeholder={props.placeholder}
							autoFocus={props.autoFocus}
							value={value}
							area={props.area}
							style={{
								flex: 1,
							}}
							onFinish={(e) => {
								if (props.onFinish) {
									props.onFinish(e)
								}
								setFocus(false)
							}}
							autoCorrect="off"
							autoCapitalize="none"
							type={showPassword ? "text" : props.type}
							autoComplete={props.autoComplete}
							inputMode={props.mode}
							onChange={async (event) => {
								let str = event.target.value

								if (props.onTextChange) {
									props.onTextChange(str)
								}

								if (error || props.errorWhileTyping) {
									text = str
									await validate()
								}

								setText(str)
							}}
							onBlur={async (e) => {
								const element = e.relatedTarget as HTMLElement
								if (autoCompleteRef.current && autoCompleteRef.current.contains(element)) {
									return
								}
								await validate()
								setFocus(false)
								if (props.onBlur) {
									props.onBlur()
								}
							}}
							onFocus={() => {
								setFocus(true)
								if (props.onFocus) {
									props.onFocus()
								}
							}}
						></Input>
					</Row>
					{error ? <Icon type="Error" size="IconSmall"></Icon> : null}
					{props.type === "password" ? (
						<div
							style={{
								position: "absolute",
								right: 0,
								top: "50%",
								transform: "translateY(-50%)",
							}}
						>
							<ClickableIcon onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <Icon type="HidePassword" size="IconSmall" /> : <Icon type="ShowPassword" size="IconSmall" />}
							</ClickableIcon>
						</div>
					) : null}
					{props.children}
					<div></div>
				</Row>
				{focus ? (
					props.renderAutoComplete ? (
						<div
							ref={autoCompleteRef}
							onPointerDown={(e) => {
								e.preventDefault()
								e.stopPropagation()
							}}
							style={{
								position: "absolute",
								top: "calc(100% - " + theme.strokeWidthThick + "px)",
								width: "100%",
								zIndex: 10,
								display: "flex",
								background: theme.colors.textBackground,
								boxShadow: "inset 0px 0px 0px " + (focus ? theme.strokeWidthThick : theme.strokeWidth) + "px " + (focus ? theme.colors.grey : theme.colors.light),
								transition: "box-shadow 150ms cubic-bezier(0.000, 0.975, 0.695, 0.675)",
								borderRadius: theme.borderSizes.small,
							}}
						>
							{props.renderAutoComplete(inputRef.current!)}
						</div>
					) : null
				) : null}
			</div>
			{error ? (
				<Text noAlignmentHacks color={props.color || error ? "negative" : "textForeground"} strong>
					{props.translateError ? props.translateError(error) : error}
				</Text>
			) : null}
		</Column>
	)
}
