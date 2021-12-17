import React, { CSSProperties, ReactNode, useState } from "react"
import { Column } from "@frontend/gui/components/layout/row-column"
import { Gutter } from "@frontend/gui/components/layout/gutter"
import { useTheme, Icon } from "@vero/gui-theme"
import { Box } from "@frontend/gui/components/box"
import { ClickableIcon } from "./clickable-icon"
import ReactCollapse from "react-collapse"

export const CollapsibleCard = (props: { style?: CSSProperties; children: ReactNode; expanded?: boolean; disabled?: boolean }) => {
	const theme = useTheme()

	const [collapsed, setCollapsed] = useState(props.expanded)
	const children = React.Children.toArray(props.children)

	return (
		<Box
			shadow
			padding="L"
			color="card"
			style={{
				filter: props.disabled ? "saturate(0) contrast(0.5)" : undefined,
				pointerEvents: props.disabled ? "none" : undefined,
				...props.style,
			}}
		>
			{children.length > 1 ? (
				<Column itemPadding="none">
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							minWidth: "auto",
							fontFamily: "medium",
							fontSize: "25px",
							color: theme.colors.black,
							textAlign: "left",
							lineHeight: "35px",
							cursor: "pointer",
						}}
						onClick={() => {
							setCollapsed(!collapsed)
						}}
					>
						{children[0]}
						<ClickableIcon onClick={() => setCollapsed(!collapsed)}>
							<Icon
								type="ChevronUp"
								color="textForeground"
								size="IconSmall"
								style={{
									justifySelf: "flex-start",
									height: "25px",
									width: "25px",

									transform: collapsed ? "" : "scale(1, -1)",
									transformOrigin: "50% 50%",

									transition: "transform 0.2s ease-in-out",
								}}
							/>
						</ClickableIcon>
					</div>
					<ReactCollapse isOpened={collapsed}>
						<Gutter size="M" />
						<Column>{children.splice(1)}</Column>
					</ReactCollapse>
				</Column>
			) : (
				<Column>{children}</Column>
			)}
		</Box>
	)
}
