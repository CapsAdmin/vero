import { AbsolutePositionCenter } from "@frontend/gui/components/absolute-position-center"
import React from "react"
import { ThemeColor, useTheme } from "@vero/gui-theme"
import { Text } from "../typography"
import { color_util } from "@vero/util/colors"
export const HorizontalPercentageBar = (props: { thin?: boolean; color?: ThemeColor; value: number }) => {
	const theme = useTheme()

	return (
		<div
			style={{
				position: "relative",
				height: props.thin ? theme.sizes.S : theme.sizes.M,
				width: "100%",
				background: color_util.Mix(theme.colors.textBackground, theme.colors.textForeground, 0.2),
				borderRadius: theme.borderSizes.small,
			}}
		>
			<div
				style={{
					background: theme.colors[props.color || "primary"],
					borderRadius: theme.borderSizes.small,
					width: props.value * 100 + "%",
					height: "100%",
				}}
			></div>
			{props.thin ? null : (
				<AbsolutePositionCenter>
					<Text strong color="white" noAlignmentHacks>
						{Math.round(props.value * 100)}%
					</Text>
				</AbsolutePositionCenter>
			)}
		</div>
	)
}
