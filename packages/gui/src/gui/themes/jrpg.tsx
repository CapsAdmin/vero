import SVGBackground from "assets//images/ff7.jpg"
import { BuildShadow, useTheme } from "@frontend/gui/theme"
import { SetupFontFace, Text } from "@frontend/gui/typography"
import { color_util } from "@frontend/other/colors"
import React, { CSSProperties, ReactNode } from "react"
import { BaseTheme } from "./base"

const gradient = ["#021830", "#03274D", "#062a67", "#154486", "#2471bd"]

const backgroundGradient =
	"linear-gradient(-45deg, " + gradient.map((color, i) => color_util.ModifyAlpha(color, Math.pow(i / gradient.length, 0.25)) + " " + Math.pow(i / gradient.length, 0.5) * 100 + "%").join(", ") + ")"

const linearGradient = (horizontal: boolean, edgeColor: string, middleColor: string, edgeLength: number, startFadeMultiplier = 1, stopFadeMultiplier = 1) => {
	return `linear-gradient(${horizontal ? "to right" : "to top"}, ${edgeColor} 0%, ${middleColor} calc(0% + ${edgeLength * startFadeMultiplier}px), ${middleColor} calc(100% - ${
		edgeLength * stopFadeMultiplier
	}px), ${edgeColor} 100%)`
}

const color = "#d1f3ff"
const decorationColor = "radial-gradient(circle, " + color + " 0%, rgba(82,107,134,0) 70%)"

const RES = 1000
const R = (n: number) => {
	return n * RES
}

const transformSize = (size: number) => {
	return "scale(calc(" + size + "/" + RES + "))"
}

const Edge = (props: { emphasis?: number; style?: CSSProperties }) => {
	const emphasis = props.emphasis || 0
	const edgeSize = emphasis * 2.5

	return (
		<div
			style={{
				width: 0,
				height: 0,
				position: "absolute",
				// boxShadow: "0px 0px " + 15 * emphasis + "px " + emphasis * 4 + "px " + color,

				...props.style,
			}}
		>
			<div
				style={{
					transform: "translate(" + R(-(edgeSize / 2)) + "px, " + R(-(edgeSize / 2)) + "px) rotate(45deg)" + transformSize(edgeSize),
					width: R(edgeSize),
					height: R(edgeSize),

					// boxShadow: "0px 0px 250px " + R(1 / 6) + "px " + color + ", " + "inset 0px 0px 250px " + R(1 / 6) + "px " + color,
					background: "radial-gradient(circle, " + color + " 0%, rgba(82,107,134,0) 40%)",
				}}
			/>
		</div>
	)
}

/*

        <div style={{
            position: "absolute",
            background: decorationColor,

            left: 5,
            top: "100%",

            transform: "translate(-50px, -50px) scale(0.15)",
            width: 100,
            height: 100,
            borderRadius: "50%",

        }} />
*/

const LineEdge = (props: { emphasis?: number; style?: CSSProperties }) => {
	const emphasis = props.emphasis || 0
	const edgeSize = 3 * emphasis
	return (
		<div
			style={{
				position: "absolute",
				background: decorationColor,
				mixBlendMode: "lighten",

				transform: "translate(" + R(-(1 / 2)) + "px, " + R(-(1 / 2)) + "px)" + transformSize(edgeSize * 1),
				width: R(1),
				height: R(1),
				borderRadius: 12.5 / emphasis + "%",

				top: 0,
				left: 0,

				...props.style,
			}}
		/>
	)
}
const Line = (props: { width?: number; emphasis?: number; extend?: number; horizontal?: boolean; fade?: number; leftFade?: number; style?: CSSProperties; absolute?: boolean; color?: string }) => {
	const axis = props.horizontal ? "Y" : "X"
	const absPosKey = props.horizontal ? "left" : "top"
	const emphasis = props.emphasis || 1
	const extend = props.extend || 0
	const thickness = props.width || 1

	return (
		<div
			style={{
				width: props.horizontal ? "auto" : thickness,
				height: props.horizontal ? thickness : "auto",
				opacity: emphasis,

				position: props.absolute ? "absolute" : "relative",
				// boxShadow: "0px 0px 10px 1px rgba(100,150,255,0.133)",
				...props.style,
			}}
		>
			<div
				style={{
					height: props.horizontal ? R(thickness) : "calc(100% + " + extend + "px)",
					width: props.horizontal ? "calc(100% + " + extend + "px)" : R(thickness),

					transform: "translate" + (props.horizontal ? "X" : "Y") + "(-" + extend / 2 + "px) translate" + axis + "(" + R(-(thickness / 2)) + "px) scale" + axis + "(calc(1/" + RES + "))",

					background: linearGradient(props.horizontal || false, "rgba(82,107,134,0)", props.color || color, props.fade === undefined ? 50 : 0, props.leftFade),
					mixBlendMode: "lighten",
				}}
			/>

			<LineEdge emphasis={emphasis} style={{ [absPosKey]: "0%" }} />
			<LineEdge emphasis={emphasis} style={{ [absPosKey]: "100%" }} />
		</div>
	)
}

const Frame = (props: { borderWidth?: number; children?: ReactNode; emphasis?: number; style?: CSSProperties }) => {
	const emphasis = props.emphasis === undefined ? 0 : props.emphasis

	const decorationPadding = 15 * emphasis
	const decorationMargin = 5 * Math.pow(emphasis, 0.75)
	const lineExtend = 65 * Math.pow(emphasis, 2)

	return (
		<div
			style={{
				position: "relative",
				//margin: decorationMargin,
			}}
		>
			<Edge emphasis={emphasis} style={{ bottom: "100%", right: "100%" }}></Edge>
			<Edge emphasis={emphasis} style={{ bottom: "100%", left: "100%" }}></Edge>
			<Edge emphasis={emphasis} style={{ top: "100%", left: "100%" }}></Edge>
			<Edge emphasis={emphasis} style={{ top: "100%", right: "100%" }}></Edge>

			<Line
				width={props.borderWidth}
				absolute
				extend={lineExtend}
				emphasis={emphasis}
				style={{
					transform: "translateX(" + -decorationMargin + "px)",
					height: "calc(100% - " + decorationPadding * 2 + "px)",
					top: decorationPadding,
					left: 0,
				}}
			/>
			<Line
				width={props.borderWidth}
				absolute
				extend={lineExtend}
				emphasis={emphasis}
				style={{
					transform: "translateX(" + decorationMargin + "px)",
					height: "calc(100% - " + decorationPadding * 2 + "px)",
					top: decorationPadding,
					right: 0,
				}}
			/>
			<Line
				width={props.borderWidth}
				absolute
				extend={lineExtend}
				emphasis={emphasis}
				horizontal
				style={{
					transform: "translateY(" + -decorationMargin + "px)",
					width: "calc(100% - " + decorationPadding * 2 + "px)",
					left: decorationPadding,
					top: 0,
				}}
			/>
			<Line
				width={props.borderWidth}
				absolute
				extend={lineExtend}
				emphasis={emphasis}
				horizontal
				style={{
					transform: "translateY(" + decorationMargin + "px)",
					width: "calc(100% - " + decorationPadding * 2 + "px)",
					left: decorationPadding,
					bottom: 0,
				}}
			/>

			<div
				style={{
					borderRadius: "1px",
					background: emphasis === 0 ? gradient[3] + "33" : backgroundGradient,
					// boxShadow: "0px 0px 10px 2.5px #03060E44, 0px 0px 4px 0px #091A32",
				}}
			>
				<div style={props.style}>{props.children}</div>
			</div>
		</div>
	)
}

const sizes = {
	none: 0,
	line: 1,
	XXXS: 2,
	XXS: 4,
	XS: 8,
	S: 14,
	M: 16,
	L: 24,
	XL: 30,
	XXL: 40,
}
const colors = color_util.BuildPallete(["hsl(220, 0%, 80%)", "hsl(220, 3%, 20%)", "hsl(220, 3%, 9%)"], {
	red: "#dd4546",
	yellow: "#e0c33d",
	blue: "#2183d3",
	green: "#69ce4a",
	purple: "#a454d8",
	brown: "#a17247",
})

const shadow = BuildShadow([
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

const shadowFooter = BuildShadow([
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

export class JRPGTheme extends BaseTheme {
	shadow = shadow
	shadowFooter = shadowFooter
	lineHeight = 5

	backgroundImage = "url(" + SVGBackground + ")"
	backgroundStyle = {
		backgroundImage: "url(" + SVGBackground + ")",
		backgroundPositionX: "50%",
		filter: "blur(5px)",
	} as BaseTheme["backgroundStyle"]

	strokeWidth = sizes.line
	iconStyle = {
		filter: "drop-shadow(1.5px 1.5px 1px rgba(0,0,0,0.5))",
	}
	strokeWidthThick = sizes.line * 2
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
		default: 1,
		small: 1,
		big: 1,
		circle: "50%",
	}

	boxStyle = {
		Contents: (props: { children?: ReactNode; style?: CSSProperties; emphasis?: number; borderWidth?: number }) => {
			return (
				<Frame borderWidth={props.borderWidth} emphasis={props.emphasis === undefined ? 1 : props.emphasis} style={props.style}>
					{props.children}
				</Frame>
			)
		},
	}
	buttonStyle = {
		zDistance: 1,
		Contents: (props: { children?: ReactNode }) => {
			const theme = useTheme()
			return (
				<>
					<div
						style={{
							padding: theme.sizes.S,
							background: "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
						}}
					>
						<Line absolute width={2} leftFade={0} emphasis={0.25} horizontal style={{ width: "100%", top: 1, left: 1 }}></Line>
						<Line absolute width={2} fade={0} emphasis={0.75} style={{ height: "100%", top: 0, left: 1 }}></Line>

						<Text>{props.children}</Text>

						<Line absolute width={2} leftFade={0} emphasis={0.25} horizontal style={{ width: "100%", bottom: -1, left: 1 }}></Line>
					</div>
				</>
			)
		},
	} as BaseTheme["buttonStyle"]

	lineStyle = {
		Render: Line,
	}
	textSizes = {
		XS: 14,
		S: 16,
		M: 20,
		L: 23,
		XL: 27,
		XXL: 32,
		XXXL: 42,
	}

	fonts = SetupFontFace({
		heading: import("assets/fonts/exo2-regular.ttf"),
		"body-weak": import("assets/fonts/exo2-light.ttf"),
		body: import("assets/fonts/exo2-regular.ttf"),
		"body-medium": import("assets/fonts/exo2-regular.ttf"),
		"body-strong": import("assets/fonts/exo2-regular.ttf"),
		monospace: import("assets/fonts/FoundryMonolinePN-Light.ttf"),
	})
	fontStyle = {
		textShadow: "0.05em 0.05em 1px rgba(0,0,0,0.5)",
	}
	colors = {
		primary: colors.blue,
		secondary: colors.green,
		positive: colors["green-lighter"],
		neutral: colors["yellow-lighter"],
		negative: colors["red-darker"],
		negativeLight: colors["red-light"],
		header: colors.dark,
		cardHeader: colors.black,

		active: colors.blue,
		inactive: colors.black,
		chatbubble: colors.black,

		selectorBackground: colors.blue,
		selectorTextBackground: colors.white,
		selectorForeground: colors.white,
		selectorTextForeground: colors.yellow,

		default: colors.white,
		textForeground: "#0eb3ed",
		textButton: colors.white,
		textH2Foreground: "#0eb3ed",
		textH2Background: "#0eb3ed",
		textGraphEmphasis: colors.light, // For example an average score in a bargraph

		foreground: colors.black,
		background: colors.black,
		textBackground: colors.black,
		codeBackground: colors.darker,
		mainBackground: colors.black,
		card: colors.darkest,
		barColorHorizontal: "linear-gradient(0deg, " + colors.yellow + " 33.03%, rgba(123, 193, 68, 0) 144.47%)",
		driverPoints: colors.purple,
		driverPointsLight: colors["purple-light"],

		underline: colors.blue,
		dashedUnderline: "rgba(95,95,95,0.25)",
		urlForeground: colors.blue,
		urlBackground: colors["blue-lighter"],
		footer: colors.darkest,
		buttonColor: colors.darkest,
		actualBlack: "rgb(0,0,0)",
		inherit: "inherit",

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
