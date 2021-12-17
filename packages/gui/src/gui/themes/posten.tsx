import { BuildShadow, ThemeColor, useTheme } from "@frontend/gui/theme"
import { color_util } from "@frontend/other/colors"
import React, { CSSProperties, ReactNode } from "react"
import { SetupFontFace } from "../typography"
import { BaseTheme } from "./base"

const sizes = {
	none: 0,
	line: 1,
	XXXS: 2,
	XXS: 4,
	XS: 8,
	S: 12,
	M: 24,
	L: 32,
	XL: 48,
	XXL: 80,
}

const colors = color_util.BuildPallete(["#FFFFFF", "#F2F2F2", "#D6D6D6", "#767676", "#444444"], {
	red: "#e22d22",
	yellow: "#f5a524",
	green: "#60B777",
	blue: "#216DB4",
	purple: "#9f60c2",
	brown: "#a17247",
})

const shadow = BuildShadow([
	{
		x: 2,
		y: 2,
		blur: 3,
		radius: 1,
		color: color_util.ModifyAlpha(colors.black, 0.05),
	},
	{
		x: 2,
		y: 2,
		blur: 20,
		radius: 5,
		color: color_util.ModifyAlpha(colors.darker, 0.05),
	},
])
const shadowFooter = BuildShadow([
	{
		x: 2,
		y: -2,
		blur: 3,
		radius: 1,
		color: color_util.ModifyAlpha(colors.black, 0.05),
	},
	{
		x: 2,
		y: -2,
		blur: 20,
		radius: 5,
		color: color_util.ModifyAlpha(colors.darker, 0.05),
	},
])

export class Posten1Theme extends BaseTheme {
	muteSounds = true
	lineHeight = 15
	buttonStyle = {
		noLight: true,
		hoverBrightness: 1,
		pressBrightness: 1,
		zDistance: 0,
		Contents: (props: { children?: ReactNode; color?: ThemeColor; hover?: boolean; pressed?: boolean; style?: CSSProperties }) => {
			const theme = useTheme()
			let color = (props.color && theme.colors[props.color]) || theme.colors.primary
			if (props.hover && !props.pressed) {
				color = color_util.Mix(color, "black", 0.3)
			}

			return (
				<div
					style={{
						boxShadow: props.pressed ? "inset 0px 0px 0px 5px rgba(0,0,0,0.3)" : undefined,
						padding: theme.sizes.S,
						background: color,
						display: "flex",
						justifyContent: "center",
						...props.style,
					}}
				>
					{props.children}
				</div>
			)
		},
	}
	fonts = SetupFontFace({
		heading: import("@frontend/assets/fonts/FoundryMonolinePN-Bold.ttf"),
		"body-weak": import("@frontend/assets/fonts/FoundryMonolinePN-Regular.ttf"),
		body: import("@frontend/assets/fonts/FoundryMonolinePN-Medium.ttf"),
		"body-medium": import("@frontend/assets/fonts/FoundryMonolinePN-Medium.ttf"),
		"body-strong": import("@frontend/assets/fonts/FoundryMonolinePN-Bold.ttf"),
		monospace: import("@frontend/assets/fonts/FoundryMonolinePN-Light.ttf"),
	})
	textSizes = {
		XS: 15,
		S: 16,
		M: 18,
		L: 22,
		XL: 32,
		XXL: 36,
		XXXL: 40,
	}
	strokeWidth = sizes.line * 2
	strokeWidthThick = sizes.line * 3
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
		default: sizes.XXS,
		small: sizes.XXS,
		big: sizes.S,
		circle: "50%",
	}
	colors = {
		primary: colors.red,
		secondary: colors.green,
		positive: colors["green-lighter"],
		neutral: colors["yellow-lighter"],
		negative: colors["red-darker"],
		negativeLight: colors["red-light"],
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
		card: colors.white,
		buttonColor: colors.red,
		actualBlack: "rgb(0,0,0)",
		inherit: "inherit",
		barColorHorizontal: colors["red"],
		textGraphEmphasis: colors.light, // For example an average score in a bargraph

		footer: colors.black,
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
