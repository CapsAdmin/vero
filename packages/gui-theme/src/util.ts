import { color_util } from "@vero/util/colors"
import { InjectCSS } from "@vero/util/css"
import { Hash, pairs } from "@vero/util/other"
import { type ThemeColor } from "."
import { type BaseTheme } from "./themes/base"

let fontId = 0
export function InjectFont(importPromise: Promise<{default: string}>) {
	const uniqueId = "font_" + fontId++

	InjectCSS(`
	@font-face {
		font-family: '${uniqueId}';
		src: local('☺'), format('truetype');
	}
	`, uniqueId)

	importPromise.then((r) => {
		InjectCSS(`
		@font-face {
			font-family: '${uniqueId}';
			src: local('☺'), url(${r.default}) format('truetype');
		}
		`, uniqueId)
	})

	return uniqueId
}


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
