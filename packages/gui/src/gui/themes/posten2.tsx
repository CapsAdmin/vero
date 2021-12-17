import { BuildShadow } from "@frontend/gui/theme"
import { color_util } from "@frontend/other/colors"
import { SetupFontFace } from "../typography"
import { BaseTheme } from "./base"
const sizes = {
	none: 0,
	line: 1,
	XXXS: 2,
	XXS: 4,
	XS: 8,
	S: 12,
	M: 25,
	L: 40,
	XL: 48,
	XXL: 80,
}

const colors = color_util.BuildPallete(["#FFFFFF", "#FFF5F0", "#FF8A5F", "#E32D22", "#980000", "#4A1011"], {
	red: "#e22d22",
	yellow: "#fcba2d",
	green: "#7BC144",
	blue: "#276FBF",
	purple: "#533A71",
	brown: "#402E2A",
})

const shadow = BuildShadow([
	{
		x: 0,
		y: 15,
		blur: 25,
		radius: 0,
		color: color_util.ModifyAlpha(colors.black, 0.1),
	},
])

const shadowFooter = BuildShadow([
	{
		x: 0,
		y: 0,
		blur: 15,
		radius: 0,
		color: color_util.ModifyAlpha(colors.black, 0.15),
	},
])

export class Posten2Theme extends BaseTheme {
	muteSounds = true
	lineHeight = 15

	fonts = SetupFontFace({
		heading: import("assets/fonts/PostenSans-Medium.ttf"),
		"body-weak": import("assets/fonts/PostenSans-Light.ttf"),
		body: import("assets/fonts/PostenSans-Regular.ttf"),
		"body-medium": import("assets/fonts/PostenSans-Medium.ttf"),
		"body-strong": import("assets/fonts/PostenSans-Bold.ttf"),
		monospace: import("assets/fonts/FoundryMonolinePN-Light.ttf"),
	})
	textSizes = {
		XS: 13,
		S: 14,
		M: 16,
		L: 22,
		XL: 35,
		XXL: 35,
		XXXL: 35,
	}
	strokeWidth = sizes.line * 1
	strokeWidthThick = sizes.line * 2
	smallBorderRadius = 2
	bigBorderRadius = 2
	underlineOffset = "0.25em" as unknown as number
	underlineThickness = 1
	shadow = shadow
	shadowFooter = shadowFooter
	backgroundStyle = { backgroundImage: " " }
	sizes = {
		default: sizes.M,
		IconTiny: 16,
		IconSmall: 24,
		IconMedium: 32,
		IconLarge: 64,
		...sizes,
	}
	borderSizes = {
		none: 0,
		default: this.smallBorderRadius,
		small: this.smallBorderRadius,
		big: this.bigBorderRadius,
		circle: "50%",
	}
	colors = {
		primary: colors.red,
		secondary: colors.red,

		positive: "#FF8A5F",
		neutral: colors.yellow,
		negative: "#767676",
		negativeLight: "#969696",

		active: colors.white,
		inactive: colors.red,

		selectorBackground: colors.red,
		selectorTextBackground: colors.white,
		selectorForeground: colors.white,
		selectorTextForeground: colors.red,

		foreground: colors.white,
		background: colors.white,
		default: colors.black,
		header: colors.black,
		cardHeader: "rgba(255,255,255,0)",
		textForeground: colors.black,
		textGraphEmphasis: colors.light, // For example an average score in a bargraph
		textButton: colors.white,
		textBackground: colors.white,
		codeBackground: colors.darker,
		textH2Foreground: colors.darker,
		textH2Background: colors.lighter,
		underline: "rgba(255,138,95,0.75)",
		dashedUnderline: "rgba(95,95,95,0.25)",
		urlForeground: "#970100",
		urlBackground: "rgba(255,138,95,0.75)",
		mainBackground: colors.white,
		card: colors.lightest,
		footer: colors.black,
		buttonColor: colors.red,
		actualBlack: "rgb(0,0,0)",
		barColorHorizontal: "linear-gradient(0deg, " + colors.red + " 33.03%, rgba(123, 193, 68, 0) 144.47%)",
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
