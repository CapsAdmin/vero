import { Row } from "@frontend/gui/components/layout/row-column"
import { Showcase } from "@frontend/gui/showcase"
import { ThemeColor, useTheme, Icon } from "@vero/gui-theme"
import { Text } from "@frontend/gui/typography"
import React, { ReactNode, useState } from "react"
import { Clickable } from "./clickable"

export const LabeledCheckbox = (props: { description?: string; children?: ReactNode; color?: ThemeColor; onClick: (checked?: boolean) => void; checked: boolean }) => {
	const theme = useTheme()

	return (
		<Clickable
			description={props.description}
			style={{
				borderRadius: theme.borderSizes.small,
				padding: theme.sizes.S,

				margin: theme.strokeWidthThick,

				boxShadow: "0px 0px 0px " + theme.strokeWidth + "px " + theme.colors[props.color || "light"],

				cursor: "pointer",
			}}
			onClick={() => {
				props.onClick(!props.checked)
			}}
		>
			<Row style={{ userSelect: "none" }} columnAlign="center" itemPadding="XS">
				<div
					style={{
						borderRadius: theme.borderSizes.small,
						borderStyle: "solid",
						borderWidth: theme.strokeWidth,
						borderColor: theme.colors.textForeground,
						boxSizing: "border-box",
						width: "1.25em",
						height: "1.25em",

						display: "flex",
						justifyContent: "center",
						alignItems: "center",

						cursor: "pointer",
						background: theme.colors.card,
					}}
					onClick={() => {
						if (props.onClick) {
							props.onClick(props.checked)
						}
					}}
				>
					<Icon
						type="Checkmark24"
						size="IconSmall"
						color="positive"
						style={{
							transform: props.checked ? "scale(1, 1)" : "scale(1, 0)",
							transition: "transform 0.05s ease-in-out",
							zIndex: 1,
						}}
					/>
				</div>

				<Text strong={props.checked}>{props.children}</Text>
			</Row>
		</Clickable>
	)
}

Showcase("labeled checkbox", () => {
	const [targetNumber, setTargetNumber] = useState(0)
	return (
		<Row wrap="space around">
			<LabeledCheckbox onClick={() => setTargetNumber(100)} checked={targetNumber === 100}>
				100
			</LabeledCheckbox>
			<LabeledCheckbox onClick={() => setTargetNumber(1000)} checked={targetNumber === 1000}>
				1000
			</LabeledCheckbox>
		</Row>
	)
})
