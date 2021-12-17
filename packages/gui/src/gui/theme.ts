import { Setting } from "@frontend/app/settings"
import { color_util } from "@frontend/other/colors"
import { BaseTheme } from "./themes/base"
export type BorderSizes = keyof BaseTheme["borderSizes"]
export type ThemeSizes = keyof BaseTheme["sizes"]
export type ThemeColor = keyof BaseTheme["colors"]
export type ThemeIcon = keyof BaseTheme["icons"]
export type TextSizes = keyof BaseTheme["textSizes"] | "inherit"
export const BuildShadow = (
	shadows: Array<{
		inset?: boolean
		x: number
		y: number
		blur: number
		radius?: number
		color: string
		intensity?: number
	}>,
) => {
	const boxShadow = []
	for (const shadow of shadows) {
		for (let i = 1; i <= (shadow.intensity || 1); i++) {
			boxShadow.push(`${shadow.inset ? "inset" : ""} ${shadow.x}px ${shadow.y}px ${shadow.blur / i}px ${shadow.radius ? shadow.radius + "px" : ""} ${shadow.color}`)
		}
	}
	return boxShadow.join(",")
}

export const getContrastedColor = (theme: BaseTheme, background: ThemeColor, mixBackground: ThemeColor, colors: ThemeColor[]): ThemeColor => {
	const bg = theme.colors[background]
	const bg2 = theme.colors[mixBackground]

	if (!color_util.IsValid(bg)) {
		return "textForeground"
	}

	let scores = []

	for (let color of colors) {
		const c = theme.colors[color]
		scores.push({
			color,
			score: color_util.FindContrast(c, bg, bg2),
		})
	}

	scores.sort((a, b) => b.score - a.score)

	return scores[0].color
}
export const useContrastedColor = (background: ThemeColor, colors?: ThemeColor[]): ThemeColor => {
	colors = colors || ["textForeground", "textBackground"]
	const theme = useTheme()
	return getContrastedColor(theme, background, "background", colors)
}

const availableThemes = new Map<string, BaseTheme>()
export const GetAvailableThemeNames = () => {
	return Array.from(availableThemes.keys())
}

availableThemes.set("auto", require("./themes/auto").AutoTheme)
availableThemes.set("dark", require("./themes/dark").DarkTheme)
availableThemes.set("light", require("./themes/light").LightTheme)
availableThemes.set("jrpg", require("./themes/jrpg").JRPGTheme)
availableThemes.set("mybring", require("./themes/mybring").MyBringTheme)
availableThemes.set("motivero", require("./themes/motivero").MotiveroTheme)
availableThemes.set("posten", require("./themes/posten").Posten1Theme)
availableThemes.set("posten2", require("./themes/posten2").Posten2Theme)

export const themeNameSetting = Setting("theme", "motivero")

export const useTheme = () => {
	const [themeName] = themeNameSetting.use()
	const theme = (availableThemes.get(themeName) || availableThemes.get("auto"))!

	const env = theme as any
	if (!env.singleton) {
		env.singleton = new env()
	}
	return env.singleton as BaseTheme
}
