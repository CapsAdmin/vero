import { color_util } from "@vero/util/colors"
import { Posten2Theme } from "./posten2"

const colors = color_util.BuildPallete(["#FFFFFF", "#F1F7E9", "#C8DC8C", "#7BC144", "#00643A", "#002F19"], {
	red: "#e22d22",
	yellow: "#fcba2d",
	green: "#7BC144",
	blue: "#276FBF",
	purple: "#533A71",
	brown: "#402E2A",
})

export class MyBringTheme extends Posten2Theme {
	override colors = {
		primary: colors.green,
		secondary: colors.green,

		positive: colors["green-lighter"],
		neutral: colors["yellow-lighter"],
		negative: colors["red-darker"],
		negativeLight: colors["red-light"],

		active: colors["green-lighter"],
		inactive: colors.green,

		selectorBackground: colors.green,
		selectorTextBackground: colors.white,
		selectorForeground: colors.white,
		selectorTextForeground: colors.green,

		foreground: colors.white,
		background: colors.lightest,
		default: colors.black,
		header: colors.black,
		cardHeader: "rgba(255,255,255,0)",
		textForeground: colors.black,
		textButton: colors.white,
		textH2Foreground: colors.darker,
		textH2Background: colors.lighter,
		textGraphEmphasis: colors.light, // For example an average score in a bargraph
		textBackground: colors.white,
		codeBackground: colors.darker,
		underline: "rgba(255,138,95,0.75)",
		dashedUnderline: "rgba(95,95,95,0.25)",
		urlForeground: "#970100",
		urlBackground: "rgba(255,138,95,0.75)",
		mainBackground: colors.white,
		card: colors.white,
		footer: colors.black,
		buttonColor: colors.red,
		actualBlack: "rgb(0,0,0)",
		barColorHorizontal: "linear-gradient(0deg, " + colors.green + " 33.03%, rgba(123, 193, 68, 0) 144.47%)",
		inherit: "inherit",
		driverPoints: colors.purple,
		driverPointsLight: colors["purple-light"],
		chatbubble: colors.lightest,

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
