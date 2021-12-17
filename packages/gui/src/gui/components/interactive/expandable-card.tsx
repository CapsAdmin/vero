import { ReactCollapse } from "@frontend/app/thirdparty"
import { ClickableIcon } from "@frontend/gui/components/interactive/clickable-icon"
import { Column } from "@frontend/gui/components/layout/row-column"
import { useTheme } from "@frontend/gui/theme"
import React, { ReactNode, useState } from "react"
import { MdExpandLess } from "react-icons/md"
import { Card } from "../card"

export const ExpandableCard = (props: { content: () => ReactNode; expandable: () => ReactNode }) => {
	const expander = useState(false)
	const [collapsed, setCollapsed] = expander
	const theme = useTheme()

	return (
		<Card style={{ position: "relative" }}>
			<>
				<Column>{props.content()}</Column>
				<ReactCollapse isOpened={collapsed}>
					<Column> {props.expandable()}</Column>
				</ReactCollapse>
				<div style={{ position: "absolute", bottom: "0%", left: "50%", transform: "translate(-50%, 50%)" }}>
					<ClickableIcon onClick={() => setCollapsed(!collapsed)}>
						<div
							style={{
								background: theme.colors.card,
								height: theme.sizes.XXXS,
								padding: theme.sizes.XS,
								borderRadius: theme.borderSizes.small,
								boxShadow: theme.shadow,

								transform: collapsed ? "" : "scale(1, -1)",

								transition: "transform 0.2s ease-in-out",
							}}
						>
							<MdExpandLess color={theme.colors.textForeground} opacity={0.5} size={theme.sizes.M} style={{ transform: "translateY(-50%)" }} />
						</div>
					</ClickableIcon>
				</div>
			</>
		</Card>
	)
}
