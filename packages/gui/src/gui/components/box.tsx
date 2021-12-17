import React, { CSSProperties, ReactNode } from "react"
import { BorderSizes, ThemeColor, ThemeSizes, useTheme } from "../theme"

export const Box = (props: {
	padding?: ThemeSizes
	borderSize?: BorderSizes
	color?: ThemeColor
	shadow?: boolean
	children?: ReactNode
	style?: CSSProperties
	emphasis?: number
	borderWidth?: number
}) => {
	const theme = useTheme()
	return (
		<theme.boxStyle.Contents
			color={props.color}
			shadow={props.shadow}
			borderSize={props.borderSize}
			emphasis={props.emphasis}
			borderWidth={props.borderWidth}
			style={{ padding: theme.sizes[props.padding || "M"], ...props.style }}
		>
			{props.children}
		</theme.boxStyle.Contents>
	)
}
