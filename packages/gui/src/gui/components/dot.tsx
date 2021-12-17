import { ThemeColor, ThemeSizes, useTheme } from "@vero/gui-theme"
import React, { CSSProperties } from "react"

export const Dot = (props: { color: ThemeColor; size?: ThemeSizes; style?: CSSProperties }) => {
	let theme = useTheme()
	return (
		<div
			style={{
				display: "inline-block",
				backgroundColor: theme.colors[props.color],
				height: theme.sizes[props.size || "S"],
				width: theme.sizes[props.size || "S"],
				borderRadius: "50%",
				...props.style,
			}}
		/>
	)
}
