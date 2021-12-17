import React from "react"
import { ThemeSizes, useTheme } from "@vero/gui-theme"

export const Gutter = (props: { size: ThemeSizes; decrease?: boolean; multiplier?: number }) => {
	const theme = useTheme()
	if (props.decrease) {
		return (
			<div
				style={{
					padding: 0,
					marginTop: -theme.sizes[props.size] * (props.multiplier ? props.multiplier : 1),
				}}
			></div>
		)
	}
	return (
		<div
			style={{
				padding: 0,
				paddingTop: theme.sizes[props.size] * (props.multiplier ? props.multiplier : 1),
			}}
		></div>
	)
}
