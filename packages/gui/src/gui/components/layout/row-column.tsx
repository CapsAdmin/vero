import { ThemeSizes, useTheme } from "@frontend/gui/theme"
import React, { CSSProperties, ReactNode, useMemo } from "react"

type BaseAlign = "center" | "start" | "end" | "baseline"
const tr = {
	start: "flex-start",
	end: "flex-end",
	"space around": "space-around",
	"space between": "space-between",
	"space evenly": "space-evenly",
}

const translate = (str: string) => {
	return tr[str as keyof typeof tr] || str
}

type JustifyContentType = BaseAlign | "space around" | "space between" | "space evenly"
type AlignItemsType = BaseAlign | "stretch"
type AlignContentType = BaseAlign | "space around" | "space between" | "space evenly" | "stretch"

export const IgnoreItemPadding = (props: { children?: ReactNode }) => {
	return <span>{props.children}</span>
}

const Flex = (props: {
	direction?: "row" | "column"
	wrap?: boolean
	justifyContent?: JustifyContentType
	alignItems?: AlignItemsType
	alignContent?: AlignContentType
	flexItems?: boolean

	itemPadding?: ThemeSizes
	skipLine?: boolean

	children?: ReactNode
	style?: CSSProperties
	props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}) => {
	const theme = useTheme()

	const p = theme.sizes[props.itemPadding || "M"]
	const padding = useMemo(
		() => (
			<div
				style={{
					padding: p / 2,
				}}
			/>
		),
		[p],
	)

	return (
		<div
			style={{
				display: "flex",
				flexWrap: props.wrap ? "wrap" : "nowrap",
				flexDirection: props.direction,
				justifyContent: translate(props.justifyContent || "start"),
				alignItems: translate(props.alignItems || "stretch"),
				alignContent: translate(props.alignItems || "stretch"),
				...props.style,
			}}
			{...props.props}
		>
			{props.itemPadding === "none"
				? props.children
				: React.Children.toArray(props.children).map((child, i, array) => {
						const nextType = array[i + 1] && (array[i + 1] as any).type
						const currentType = (child as any).type

						if (props.skipLine) {
							if (nextType && (nextType.name === "Line" || nextType.name === "Gutter")) {
								return (
									<React.Fragment key={i}>
										{child}
										{
											<div
												style={{
													padding: p / 2,
												}}
											/>
										}
									</React.Fragment>
								)
							}

							if (currentType && currentType.name === "Line") {
								return (
									<React.Fragment key={i}>
										{child}
										{
											<div
												style={{
													padding: p / 2,
												}}
											/>
										}
									</React.Fragment>
								)
							}
						}

						if (i === array.length - 1) {
							return <React.Fragment key={i}>{child}</React.Fragment>
						}

						if (currentType && currentType.name === "CardLine") {
							// is there a better way to do this? tagged nodes or something?
							return <React.Fragment key={i}>{child}</React.Fragment>
						}

						return (
							<React.Fragment key={i}>
								{child}
								{padding}
							</React.Fragment>
						)
				  })}
		</div>
	)
}
export const Row = (props: {
	rowAlign?: JustifyContentType
	selfAlign?: JustifyContentType
	columnAlign?: BaseAlign
	stretchColumn?: boolean
	wrap?: AlignContentType

	itemPadding?: ThemeSizes
	skipLine?: boolean

	props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	children?: ReactNode
	style?: CSSProperties
}) => {
	return (
		<Flex
			direction="row"
			justifyContent={props.rowAlign || props.selfAlign}
			alignItems={props.columnAlign}
			flexItems={props.stretchColumn}
			itemPadding={props.itemPadding}
			skipLine={props.skipLine}
			wrap={props.wrap ? true : false}
			alignContent={props.wrap}
			style={props.style}
			props={props.props}
		>
			{props.children}
		</Flex>
	)
}

export const Column = (props: {
	columnAlign?: JustifyContentType
	selfAlign?: JustifyContentType
	rowAlign?: BaseAlign
	stretchRow?: boolean
	wrap?: AlignContentType

	itemPadding?: ThemeSizes
	skipLine?: boolean

	props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	children?: ReactNode
	style?: CSSProperties
}) => {
	return (
		<Flex
			direction="column"
			justifyContent={props.columnAlign || props.selfAlign}
			alignItems={props.stretchRow ? "stretch" : props.rowAlign}
			flexItems={props.stretchRow}
			itemPadding={props.itemPadding}
			skipLine={props.skipLine}
			wrap={props.wrap ? true : false}
			alignContent={props.wrap}
			style={props.style}
			props={props.props}
		>
			{props.children}
		</Flex>
	)
}

export const PageColumn = (props: { children?: ReactNode }) => <Column itemPadding="XL">{props.children}</Column>
export const ContentColumn = (props: { children?: ReactNode }) => {
	return (
		<article><Column itemPadding="M">{props.children}</Column></article>
	)
}
export const ItemColumn = (props: { children?: ReactNode }) => <Column itemPadding="S">{props.children}</Column>

export const PageRow = (props: { children?: ReactNode }) => <Row itemPadding="XL">{props.children}</Row>
export const ContentRow = (props: { children?: ReactNode }) => <Row itemPadding="M">{props.children}</Row>
export const ItemRow = (props: { children?: ReactNode }) => <Row itemPadding="S">{props.children}</Row>
