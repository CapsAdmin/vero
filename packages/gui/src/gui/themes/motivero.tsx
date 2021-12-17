import { BuildShadow, useTheme } from "@frontend/gui/theme"
import { color_util } from "@frontend/other/colors"
import { SetupFontFace } from "../typography"
import { BaseTheme } from "./base"
const sizes = {
	none: 0,
	line: 1,
	XXXS: 2,
	XXS: 4,
	XS: 4,
	S: 8,
	M: 16,
	L: 24,
	XL: 32,
	XXL: 64,
}
const Colors = {
	Accents: {
		Primary: "rgba(253, 187, 47, 1)",
		Darker: "rgba(175, 119, 51, 1)",
		DriverPoints: "rgba(162, 49, 163, 1)",
		Compliment: "rgba(250, 102, 173, 1)",
	},
	Motivero: {
		Dark: "rgba(35, 49, 98, 1)",
		Primary: "rgba(48, 96, 130, 1)",
		Light: "rgba(47, 134, 162, 1)",
		Lighter: "rgba(174, 205, 227, 1)",
		White: "#E0ECEC",
	},
	Grey: {
		Black: "rgba(28, 28, 31, 1)",
		Primary: "rgba(123, 114, 106, 1)",
		Light: "rgba(189, 184, 179, 1)",
		Lighter: "rgba(214, 214, 214, 1)",
		White: "rgba(242, 242, 242, 1)",
	},
	Bring: {
		White: "rgba(241, 247, 233, 1)",
		Light: "rgba(200, 220, 140, 1)",
		Primary: "rgba(123, 193, 68, 1)",
		Dark: "rgba(0, 100, 58, 1)",
		Darker: "rgba(0, 47, 25, 1)",
	},
	Posten: {
		Darker: "rgba(74, 16, 17, 1)",
		Dark: "rgba(152, 0, 0, 1)",
		Primary: "rgba(227, 45, 34, 1)",
		Light: "rgba(255, 138, 95, 1)",
		White: "rgba(255, 245, 240, 1)",
	},
}

const shadow = BuildShadow([
	{
		x: 0,
		y: 0,
		blur: 10,
		radius: 0,
		color: color_util.ModifyAlpha(Colors.Grey.Black, 0.2),
	},
])

const shadowFooter = BuildShadow([
	{
		x: 0,
		y: 0,
		blur: 15,
		radius: 0,
		color: color_util.ModifyAlpha(Colors.Grey.Black, 0.15),
	},
])

export class MotiveroTheme extends BaseTheme {
	muteSounds = true
	lineHeight = 7

	fonts = SetupFontFace({
		heading: import("assets/fonts/PostenSans-Medium.ttf"),
		"body-weak": import("assets/fonts/PostenSans-Light.ttf"),
		body: import("assets/fonts/PostenSans-Regular.ttf"),
		"body-medium": import("assets/fonts/PostenSans-Medium.ttf"),
		"body-strong": import("assets/fonts/PostenSans-Bold.ttf"),
		monospace: import("assets/fonts/FoundryMonolinePN-Light.ttf"),
	})
	textSizes = {
		XS: 8,
		S: 12,
		M: 15,
		L: 18,
		XL: 24,
		XXL: 32,
		XXXL: 40,
	}

	strokeWidth = sizes.line * 1
	strokeWidthThick = sizes.line * 2
	underlineOffset = "1px" as unknown as number
	underlineThickness = 1
	shadow = shadow
	shadowFooter = shadowFooter
	backgroundStyle = { backgroundImage: " " }
	lineStyle = {
		Render: (props: { strong: boolean; horizontal: boolean; color: string }) => {
			const theme = useTheme()
			const thickness = props.strong ? theme.strokeWidthThick : theme.strokeWidth

			return (
				<div
					style={{
						color: "none",
						border: "none",
						opacity: props.strong ? 1 : 0.6,

						background: props.color || theme.colors.grey,

						width: props.horizontal ? "100%" : thickness,
						height: props.horizontal ? thickness : "auto",
						borderRadius: thickness / 2,
					}}
				></div>
			)
		},
	}

	borderSizes = {
		none: 0,
		default: this.sizes.XXS,
		small: this.sizes.XXS,
		big: this.sizes.XS,
		circle: "50%",
	}
	sizes = {
		default: sizes.M,
		IconTiny: 16,
		IconSmall: 24,
		IconMedium: 32,
		IconLarge: 64,
		...sizes,
	}

	colors = {
		primary: Colors.Motivero.Primary,
		secondary: Colors.Accents.Primary,

		positive: Colors.Bring.Primary,
		neutral: Colors.Accents.Primary,
		negative: Colors.Posten.Primary,
		negativeLight: Colors.Posten.Light,

		active: Colors.Motivero.Lighter,
		inactive: Colors.Motivero.Light,

		selectorBackground: Colors.Motivero.Light,
		selectorTextBackground: Colors.Motivero.White,

		selectorForeground: Colors.Motivero.Lighter,
		selectorTextForeground: Colors.Motivero.Primary,

		foreground: Colors.Motivero.Lighter,
		background: Colors.Motivero.White,

		default: Colors.Motivero.Primary,
		header: Colors.Motivero.Primary,
		cardHeader: Colors.Motivero.Primary,

		textForeground: Colors.Grey.Black,
		textButton: Colors.Grey.White,
		textBackground: Colors.Grey.White,
		codeBackground: Colors.Grey.White,
		textH2Foreground: Colors.Motivero.Dark,
		textH2Background: Colors.Motivero.Light,

		// For example an average score in a bargraph
		textGraphEmphasis: Colors.Motivero.Light,

		underline: Colors.Motivero.Light,
		dashedUnderline: "rgba(95,95,95,0.25)",
		urlForeground: Colors.Motivero.Light,
		urlBackground: Colors.Motivero.Lighter,
		mainBackground: Colors.Grey.White,
		card: "#FFF",
		chatbubble: "#FFF",
		footer: Colors.Grey.Black,
		buttonColor: Colors.Motivero.Primary,
		actualBlack: "rgb(0,0,0)",
		barColorHorizontal: color_util.ModifyAlpha(Colors.Bring.Primary, 0.7),

		driverPoints: Colors.Accents.DriverPoints,
		driverPointsLight: Colors.Accents.Compliment,

		black: Colors.Grey.Black,
		darkest: Colors.Grey.Black,
		darker: Colors.Grey.Black,
		dark: Colors.Grey.Black,
		grey: Colors.Grey.Primary,
		light: Colors.Grey.Light,
		lighter: Colors.Grey.Lighter,
		lightest: Colors.Grey.Lighter,
		white: Colors.Grey.White,

		package: Colors.Accents.Darker,

		productivity: Colors.Accents.Primary,
		quality: Colors.Posten.Primary,
		service: Colors.Motivero.Primary,

		gold: Colors.Accents.Primary,
		goldShadow: Colors.Accents.Darker,
		grid: color_util.ModifyAlpha(Colors.Grey.Lighter, 0.25),

		inherit: "inherit",
	}
}
