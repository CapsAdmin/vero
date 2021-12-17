import SVGBackground from "@frontend/assets/images/background.svg"
import { BuildShadow } from "@frontend/gui/theme"
import { color_util } from "@frontend/other/colors"
import { BaseTheme } from "./base"

const colors = color_util.BuildPallete(["hsl(220, 0%, 80%)", "hsl(220, 3%, 20%)", "hsl(220, 3%, 9%)"], {
	red: "#fc674c",
	yellow: "#FECE6B",
	blue: "#216DB4",
	green: "#60B777",
	purple: "#b174e8",
	brown: "#a17247",
})

export class DarkTheme extends BaseTheme {
	shadow = BuildShadow([
		{
			x: 0,
			y: 0,
			blur: 4,
			intensity: 2,
			color: color_util.ModifyAlpha(colors.black, 0.1),
		},
		{
			x: 3,
			y: 3,
			blur: 8,
			radius: 5,
			color: color_util.ModifyAlpha(colors.darker, 0.1),
		},
	])
	shadowFooter = BuildShadow([
		{
			x: 0,
			y: 0,
			blur: 4,
			intensity: 2,
			color: color_util.ModifyAlpha(colors.black, 0.1),
		},
		{
			x: 3,
			y: -3,
			blur: 8,
			radius: 5,
			color: color_util.ModifyAlpha(colors.darker, 0.1),
		},
	])
	backgroundImage = "url(" + SVGBackground + ")"
	colors = {
		primary: colors.blue,
		secondary: colors.green,
		positive: colors["green-lighter"],
		neutral: colors["yellow-lighter"],
		negative: colors["red-darker"],
		negativeLight: colors["red-light"],
		header: colors.darker,
		cardHeader: "rgba(255,255,255,0)",

		active: colors.white,
		inactive: colors.black,

		selectorBackground: colors.grey,
		selectorTextBackground: colors.white,
		selectorForeground: colors.white,
		selectorTextForeground: colors.dark,

		default: colors.white,
		textForeground: colors.white,
		textButton: colors.white,
		textH2Foreground: colors.lightest,
		textH2Background: colors.darker,
		textGraphEmphasis: colors.light, // For example an average score in a bargraph

		foreground: colors.black,
		background: colors.black,
		textBackground: colors.black,
		codeBackground: colors.lighter,
		mainBackground: colors.black,
		card: colors.darkest,
		barColorHorizontal: colors.blue,

		underline: colors.blue,
		dashedUnderline: "rgba(95,95,95,0.25)",
		urlForeground: colors.blue,
		urlBackground: colors["blue-lighter"],
		chatbubble: colors.darker,
		footer: colors.darkest,
		buttonColor: colors.darkest,
		actualBlack: "rgb(0,0,0)",
		inherit: "inherit",

		driverPoints: colors.purple,
		driverPointsLight: colors["purple-light"],

		black: colors.black,
		darkest: colors.darkest,
		darker: colors.darker,
		dark: colors.dark,
		grey: colors.grey,
		light: colors.light,
		lighter: colors.lighter,
		lightest: colors.lightest,
		white: colors.white,
		package: colors.yellow,

		gold: colors.yellow,
		goldShadow: colors["yellow-darker"],
		grid: color_util.ModifyAlpha(colors.lighter, 0.25),

		productivity: colors.yellow,
		quality: colors.red,
		service: colors.blue,
	}
}
