import { URL } from "@frontend/gui/components/interactive/url"
import { Showcase } from "@frontend/gui/showcase"
import { InjectCSS } from "@vero/util/css"
import { Hash, pairs } from "@vero/util/other"
import { useMediaQuery } from "@vero/util/react-hooks"
import React, { CSSProperties, ReactNode, useState } from "react"
import { Column, Row } from "./components/layout/row-column"
import { useTheme } from "@vero/gui-theme"
import { TextSizes, ThemeColor, Icon } from "@vero/gui-theme"
import { getContrastedColor } from "@vero/gui-theme/src/util"
import { FormatNumber, FormatTime } from "./translation"

export const TextArea = (
	props: React.DetailedHTMLProps<
		React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
			onFocusChanged?: (focused: boolean) => void
		},
		HTMLTextAreaElement
	>,
) => {
	const [focus, setFocus] = useState(false)
	const theme = useTheme()

	return (
		<Text
			element="textarea"
			style={{
				resize: "none",

				outline: "none",
				borderStyle: "none",
				borderWidth: "0",

				borderRadius: theme.borderSizes.small,
				background: theme.colors.textBackground,

				boxShadow: "0px 0px 0px " + (focus ? theme.strokeWidthThick : theme.strokeWidth) + "px " + (focus ? theme.colors.grey : theme.colors.light),
				transition: "box-shadow 150ms ease-in-out",

				padding: theme.sizes.S,

				userSelect: "initial",
				lineHeight: "normal",

				height: "4rem",

				...props.style,
			}}
			props={
				{
					...{
						onFocus: () => {
							setFocus(true)
							if (props.onFocusChanged) {
								props.onFocusChanged(true)
							}
						},
						onBlur: () => {
							setFocus(false)
							if (props.onFocusChanged) {
								props.onFocusChanged(false)
							}
						},
					},
					...props,
				} as typeof props
			}
		/>
	)
}

const adjust = ({
	typeSizeModifier,
	baseFontSize,
	descenderHeightScale,
	typeRowSpan,
	gridRowHeight,
	capHeightScale,
	offset,
}: {
	typeSizeModifier: number
	baseFontSize: number
	descenderHeightScale: number
	capHeightScale: number
	typeRowSpan: number
	gridRowHeight: number
	offset: number
}) => {
	const fontSize = typeSizeModifier * baseFontSize

	const calculateTypeOffset = (lh: number) => {
		const lineHeightScale = lh / fontSize
		return (lineHeightScale - 1) / 2 + descenderHeightScale
	}

	const lineHeight = typeRowSpan * gridRowHeight
	const typeOffset = calculateTypeOffset(lineHeight)

	const topSpace = lineHeight - capHeightScale * fontSize
	const heightCorrection = topSpace > gridRowHeight ? topSpace - (topSpace % gridRowHeight) : 0

	const preventCollapse = 1

	return {
		base: {
			fontSize: `${fontSize}px`,
			lineHeight: `${lineHeight}px`,
		},
		baseline: {
			transform: `translateY(${typeOffset - offset}em)`,
		},
		cropFirstLine: {
			paddingTop: preventCollapse + "px",
			":before": {
				content: "''",
				marginTop: -(heightCorrection + preventCollapse) + "px",
				display: "block",
				height: "0px",
			},
		},
	}
}

const fixed = new Set<string>()

const textFixup = (fontFamily: string, fontSize: number, lineHeight: number) => {
	const className = ["text_fixup", fontSize, lineHeight, fontFamily].join("_").replace(/\./g, "_")

	if (!fixed.has(className)) {
		const data = adjust({
			baseFontSize: 1,

			typeSizeModifier: fontSize,
			typeRowSpan: fontSize + lineHeight,

			capHeightScale: 0.7,
			gridRowHeight: 0.8,
			descenderHeightScale: 0,
			offset: (lineHeight / fontSize) * 0.7,
		})

		InjectCSS(`
			.${className} {
				transform: ${data.baseline.transform};
				line-height: ${data.base.lineHeight};
				padding-top: ${data.cropFirstLine.paddingTop};
			}
			.${className}:after {
				height: ${data.cropFirstLine[":before"].height};
				content: ${data.cropFirstLine[":before"].content};
				display: ${data.cropFirstLine[":before"].display};
				margin-top: ${data.cropFirstLine[":before"].marginTop};
			}

		`)

		fixed.add(className)
	}

	return className
}

const sizesRange = ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"]
const useScaler = (size: string, widths: number[], minimum: string) => {
	const sizes = sizesRange.slice(sizesRange.indexOf(minimum))

	for (const width of widths) {
		// eslint-disable-next-line
		const w = useMediaQuery(`(max-width: ${width}px)`)
		if (w) {
			const index = sizes.indexOf(size) - 1
			if (index > -1) {
				size = sizes[index]
			}
		}
	}

	return size
}

const TextContext = React.createContext<ReactNode>(null)
export const Text = (props: {
	className?: string
	children?: ReactNode
	element?: string
	backgroundColor?: ThemeColor
	font?: "heading" | "body" | "monospace"
	style?: CSSProperties
	noAlignmentHacks?: boolean
	props?: any
	noWrap?: boolean
	italics?: boolean

	heading?: boolean
	size?: TextSizes
	color?: ThemeColor
	strong?: boolean
	medium?: boolean
	weak?: boolean
	strikethrough?: boolean
	underline?: boolean
	dottedUnderline?: boolean
	minimumSize?: TextSizes
}) => {
	const theme = useTheme()
	const parentNode = React.useContext(TextContext)

	const color = theme.colors[props.color || "textForeground"]
	const backgroundColor = props.backgroundColor ? theme.colors[props.backgroundColor] : undefined

	const size = useScaler(props.heading && !props.size ? "XXL" : props.size || "M", [320, 375, 415], props.minimumSize || (props.heading ? "XL" : "S")) as keyof typeof theme.textSizes

	const fontSize = theme.textSizes[size]

	const font = props.heading ? "heading" : props.font || "body"

	const style: CSSProperties = {
		fontFamily: theme.fonts[font],
		background: backgroundColor,
		textDecorationLine: "none",
		fontSize,
		color,
	}

	if (parentNode) {
		style.display = "inline-block"
		style.transform = "translateY(0px)"
	}

	if (props.heading) {
		style.display = "block"
		// style.fontSize = "calc(min(" + size + "px, " + size + "px + 3vw - 25px)"
	}

	if (props.strong) {
		const key = (font + "-strong") as keyof typeof theme.fonts

		if (key in theme.fonts) {
			style.fontFamily = theme.fonts[key]
		}
	}

	if (props.medium) {
		const key = (font + "-medium") as keyof typeof theme.fonts

		if (key in theme.fonts) {
			style.fontFamily = theme.fonts[key]
		}
	}

	if (props.weak) {
		const key = (font + "-weak") as keyof typeof theme.fonts

		if (key in theme.fonts) {
			style.fontFamily = theme.fonts[key]
		}

		style.opacity = 0.66
	}

	if (props.dottedUnderline) {
		style.textDecorationLine = "underline"
		style.textDecorationThickness = typeof theme.underlineThickness === "string" ? theme.underlineThickness : theme.underlineThickness * (fontSize / 10)
		style.textDecorationStyle = "dashed"
		style.textUnderlineOffset = theme.underlineOffset
		style.textDecorationColor = theme.colors.dashedUnderline
	}

	if (props.underline) {
		style.textDecorationLine = "underline"
		style.textDecorationThickness = typeof theme.underlineThickness === "string" ? theme.underlineThickness : theme.underlineThickness * (fontSize / 10)
		style.textDecorationStyle = "solid"
		style.textUnderlineOffset = theme.underlineOffset
		style.textDecorationColor = props.color ? theme.colors[props.color] : theme.colors.underline
	}

	if (props.color) {
		style.color = theme.colors[props.color]
	}

	if (props.strikethrough) {
		style.textDecorationLine = "line-through"
		style.textDecorationThickness = fontSize / 10
		style.textDecorationStyle = "solid"
	}

	if (props.noAlignmentHacks) {
		style.fontSize = fontSize
	}

	if (props.noWrap) {
		style.whiteSpace = "nowrap"
	}

	if (props.italics) {
		style.transform = "skewX(-12.5deg) translateX(2px)"
	}
	const node = React.createElement(
		props.element || "div",
		{
			className: props.noAlignmentHacks ? props.className || "" : `${props.className} ${textFixup(style.fontFamily, fontSize, theme.lineHeight)}`,
			...props.props,
			style: { ...style, ...theme.fontStyle, ...props.style },
		},
		props.children,
	)

	return <TextContext.Provider value={node}>{node}</TextContext.Provider>
}
export const List = (props: { children?: ReactNode; numeric?: boolean }) => {
	return (
		<Column itemPadding="S" columnAlign="center">
			{React.Children.map(props.children, (val, i) => {
				return (
					<Row key={i.toString()} itemPadding="XXS" columnAlign="start">
						<Text size="S" color={(val as any).props.color} strong={!props.numeric}>
							{props.numeric ? (i + 1).toString() + "." : "•"}
						</Text>
						{val}
					</Row>
				)
			})}
		</Column>
	)
}

export const InlineCode = (props: { children: string | number }) => {
	const theme = useTheme()
	return (
		<Text
			font="monospace"
			size="S"
			noAlignmentHacks
			style={{
				background: theme.colors.codeBackground,
				borderRadius: theme.borderSizes.small,
				paddingLeft: theme.sizes.XS,
				paddingRight: theme.sizes.XS,
			}}
		>
			{props.children}
		</Text>
	)
}

Showcase(
	"text properties",
	() => (
		<Column>
			<div>
				<Text>
					This has <Text strong>strong</Text> emphasis.
				</Text>
			</div>
			<div>
				<Text>
					This has <Text weak>weak</Text> emphasis.
				</Text>
			</div>
			<div>
				<Text>
					This has <Text strikethrough>wrong</Text> emphasis.
				</Text>
			</div>
			<div>
				<Text>
					This has a large{" "}
					<Text strikethrough size="XXL">
						wrong
					</Text>{" "}
					emphasis.
				</Text>
			</div>
			<div>
				<Text>
					This has <URL url="https://www.goaogle.com">URL</URL> goes to google.
				</Text>
			</div>
		</Column>
	),
	"typography",
)

Showcase(
	"inline text",
	() => {
		return (
			<Text>
				Here is an <URL url="https://www.google.com">URL</URL> for you Here is an <URL url="https://www.google.com">URL</URL> for you Here is an <URL url="https://www.google.com">URL</URL> for
				you Here is an <URL url="https://www.google.com">URL</URL> for you Here is an <URL url="https://www.google.com">URL</URL> for you Here is an <URL url="https://www.google.com">URL</URL>{" "}
				for you Here is an <URL url="https://www.google.com">URL</URL> for you
			</Text>
		)
	},
	"typography",
)

Showcase(
	"text margins",
	() => (
		<Column>
			<Text size="XXXL">Foo bar</Text>
			<Text>The yellow rectangle around the text should fit the text exactly. The bottom should follow the baseline.</Text>
			{(["XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const).map((size) => {
				return (["heading", "body"] as const).map((font, i) => {
					return (
						<div key={i} style={{ backgroundColor: "yellow" }}>
							<Text heading={font === "heading"} font={font} size={size}>
								{font + " " + size}
							</Text>
						</div>
					)
				})
			})}
			<div style={{ backgroundColor: "yellow" }}>
				<Text>
					Braid aims to make cross-brand UI development as fast as possible while maintaining a high level of quality and accessibility. In order to achieve this, Braid is implemented as a
					series of React components and treat themes.
				</Text>
			</div>
		</Column>
	),
	"typography",
)
Showcase(
	"text list",
	() => (
		<Column>
			<List>
				<Text>First point</Text>
				<URL url="https://www.google.com">Second point</URL>
				<Text size="XS">Third point</Text>
			</List>
		</Column>
	),
	"typography",
)

Showcase("text area", () => <TextArea></TextArea>, "typography")

Showcase(
	"text foreground / background",
	() => {
		const theme = useTheme()

		let colors: { bg: ThemeColor; fg: ThemeColor }[] = []

		for (let [key] of pairs(theme.colors)) {
			colors.push({ bg: key, fg: getContrastedColor(theme, key, "background", ["textForeground", "textBackground"]) })
		}

		return (
			<Column>
				{colors.map(({ bg, fg }) => (
					<div style={{ background: theme.colors[bg] }}>
						<Text noAlignmentHacks color={fg}>
							Hello world {theme.colors[bg]}
						</Text>
					</div>
				))}
			</Column>
		)
	},
	"typography",
)
