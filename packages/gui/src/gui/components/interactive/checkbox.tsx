import React, { CSSProperties } from "react"
import { ThemeColor, useTheme, Icon } from "@vero/gui-theme"
import { Clickable } from "./clickable"

export const Checkbox = (props: { onClick?: (checked: boolean) => void; checked: boolean; weak?: boolean; style?: CSSProperties; checkColor?: ThemeColor; description?: string }) => {
	const theme = useTheme()

	return (
		<Clickable
			description={props.description}
			style={{
				borderRadius: theme.borderSizes.small / 2,
				borderStyle: "solid",
				borderWidth: theme.strokeWidth,
				borderColor: theme.colors.textForeground,
				boxSizing: "border-box",
				width: "1em",
				height: "1em",

				display: "flex",
				justifyContent: "center",
				alignItems: "center",

				cursor: "pointer",
				...props.style,
			}}
			onClick={() => {
				if (props.onClick) {
					props.onClick(props.checked)
				}
			}}
		>
			<Icon
				type="Checkmark24"
				size={"IconTiny"}
				color={props.checkColor || "textForeground"}
				style={{
					transform: props.checked ? "scale(1, 1)" : "scale(1, 0)",
					transition: "transform 0.05s ease-in-out",
				}}
			/>
		</Clickable>
	)
}
