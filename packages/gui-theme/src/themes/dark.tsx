import SVGBackground from "../assets/images/background.svg"
import { BuildShadow } from "../util"
import { color_util } from "@vero/util/colors"
import { BaseTheme } from "./base"

const darkColors = color_util.BuildPallete(["hsl(220, 0%, 80%)", "hsl(220, 3%, 20%)", "hsl(220, 3%, 9%)"], {
	red: "#fc674c",
	yellow: "#FECE6B",
	blue: "#216DB4",
	green: "#60B777",
	purple: "#b174e8",
	brown: "#a17247",
})

export class DarkTheme extends BaseTheme {
	override shadow = BuildShadow([
		{
			x: 0,
			y: 0,
			blur: 4,
			intensity: 2,
			color: color_util.ModifyAlpha(darkColors.black, 0.1),
		},
		{
			x: 3,
			y: 3,
			blur: 8,
			radius: 5,
			color: color_util.ModifyAlpha(darkColors.darker, 0.1),
		},
	])
	override shadowFooter = BuildShadow([
		{
			x: 0,
			y: 0,
			blur: 4,
			intensity: 2,
			color: color_util.ModifyAlpha(darkColors.black, 0.1),
		},
		{
			x: 3,
			y: -3,
			blur: 8,
			radius: 5,
			color: color_util.ModifyAlpha(darkColors.darker, 0.1),
		},
	])
	backgroundImage = "url(" + SVGBackground + ")"
	override colors = {
		primary: darkColors.blue,
		secondary: darkColors.green,
		positive: darkColors["green-lighter"],
		neutral: darkColors["yellow-lighter"],
		negative: darkColors["red-darker"],
		negativeLight: darkColors["red-light"],
		header: darkColors.darker,
		cardHeader: "rgba(255,255,255,0)",

		active: darkColors.white,
		inactive: darkColors.black,

		selectorBackground: darkColors.grey,
		selectorTextBackground: darkColors.white,
		selectorForeground: darkColors.white,
		selectorTextForeground: darkColors.dark,

		default: darkColors.white,
		textForeground: darkColors.white,
		textButton: darkColors.white,
		textH2Foreground: darkColors.lightest,
		textH2Background: darkColors.darker,
		textGraphEmphasis: darkColors.light, // For example an average score in a bargraph

		foreground: darkColors.black,
		background: darkColors.black,
		textBackground: darkColors.black,
		codeBackground: darkColors.lighter,
		mainBackground: darkColors.black,
		card: darkColors.darkest,
		barColorHorizontal: darkColors.blue,

		underline: darkColors.blue,
		dashedUnderline: "rgba(95,95,95,0.25)",
		urlForeground: darkColors.blue,
		urlBackground: darkColors["blue-lighter"],
		chatbubble: darkColors.darker,
		footer: darkColors.darkest,
		buttonColor: darkColors.darkest,
		actualBlack: "rgb(0,0,0)",
		inherit: "inherit",

		driverPoints: darkColors.purple,
		driverPointsLight: darkColors["purple-light"],

		black: darkColors.black,
		darkest: darkColors.darkest,
		darker: darkColors.darker,
		dark: darkColors.dark,
		grey: darkColors.grey,
		light: darkColors.light,
		lighter: darkColors.lighter,
		lightest: darkColors.lightest,
		white: darkColors.white,
		package: darkColors.yellow,

		gold: darkColors.yellow,
		goldShadow: darkColors["yellow-darker"],
		grid: color_util.ModifyAlpha(darkColors.lighter, 0.25),

		productivity: darkColors.yellow,
		quality: darkColors.red,
		service: darkColors.blue,
	}
}
