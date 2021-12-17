import { useEffect } from "react"
import { DEBUG } from "@vero/util/other"
// normalizes all css
import "normalize.css"

import { getContrastedColor } from "./util"
import { Observer } from "@vero/util/observer"
export { BaseTheme, Icon } from "./themes/base"
import { BaseTheme } from "./themes/base"
import { AutoTheme } from "./themes/auto"
import { DarkTheme } from "./themes/dark"
import { LightTheme } from "./themes/light"
import { JRPGTheme } from "./themes/jrpg"
import { MyBringTheme } from "./themes/mybring"
import { MotiveroTheme } from "./themes/motivero"
import { Posten1Theme } from "./themes/posten"
import { Posten2Theme } from "./themes/posten2"

export type BorderSizes = keyof BaseTheme["borderSizes"]
export type ThemeSizes = keyof BaseTheme["sizes"]
export type ThemeColor = keyof BaseTheme["colors"]
export type ThemeIcon = keyof BaseTheme["icons"]
export type TextSizes = keyof BaseTheme["textSizes"] | "inherit"

export const useContrastedColor = (background: ThemeColor, colors?: ThemeColor[]): ThemeColor => {
	colors = colors || ["textForeground", "textBackground"]
	const theme = useTheme()
	return getContrastedColor(theme, background, "background", colors)
}

const availableThemes = new Map<string, any>()
export const GetAvailableThemeNames = () => {
	return Array.from(availableThemes.keys())
}

availableThemes.set("auto", AutoTheme)
availableThemes.set("dark", DarkTheme)
availableThemes.set("light", LightTheme)
availableThemes.set("jrpg", JRPGTheme)
availableThemes.set("mybring", MyBringTheme)
availableThemes.set("motivero", MotiveroTheme)
availableThemes.set("posten", Posten1Theme)
availableThemes.set("posten2", Posten2Theme)

let currentTheme = new Observer<string>("auto")

export const setCurrentTheme = (name: string) => {
	currentTheme.value = name
}

export const useTheme = () => {
	const [themeName] = currentTheme.use()
	const theme = availableThemes.get(themeName) || availableThemes.get("auto")!
	const env = theme as any

	if (!env.singleton) {
		env.singleton = new env()
	}

	return env.singleton as BaseTheme
}

export const useDebugThemeSwitcher = () => {
	useEffect(() => {
		let themes = [...GetAvailableThemeNames()].filter((a) => a && a !== "auto")
		let i = 0
		let cb = (e: KeyboardEvent) => {
			if (document.activeElement?.nodeName === "INPUT") {
				return
			}

			if (e.key === "t") {
				setCurrentTheme(themes[i])

				i++
				if (i >= themes.length) {
					i = 0
				}
				console.log("changed theme to " + themes[i])
			}
		}
		window.addEventListener("keypress", cb)

		return () => {
			window.removeEventListener("keypress", cb)
		}
	}, [])
}
