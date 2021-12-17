import { Column } from "@frontend/gui/components/layout/row-column"
import React from "react"
import { useTheme, ThemeColor } from "@vero/gui-theme"
import { Text } from "../typography"
import { chroma } from "@frontend/app/thirdparty"

const nps2color = (n: number): ThemeColor => {
	return n >= 9 ? "positive" : n >= 7 ? "neutral" : "negative"
}

export const ScoreCircle = (props: { value?: number }) => {
	const theme = useTheme()
	const color: ThemeColor = props.value !== undefined ? nps2color(props.value) : "lighter"

	return (
		<Column style={{ flex: 1 }} itemPadding="XXS" rowAlign="center">
			<div style={{ flex: 1, position: "relative" }}>
				<div
					style={{
						width: theme.sizes.L,
						height: theme.sizes.L,
						background: color === "grey" ? chroma(theme.colors.light).desaturate(100).hex() : (theme.colors as any)[color + "-lighter"],
						borderRadius: "50%",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translateY(calc(-50% - 0.1em)) translateX(-50%)",
					}}
				>
					<Text color={color} size="XL" strong>
						{props.value === undefined ? "" : Math.ceil(props.value).toString()}
					</Text>
				</div>
			</div>
		</Column>
	)
}
