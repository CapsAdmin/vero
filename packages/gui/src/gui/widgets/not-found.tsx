import { Box } from "@frontend/gui/components/box"
import { CollapsibleCard } from "@frontend/gui/components/interactive/collapsible-card"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import React, { ReactNode } from "react"
import { Text } from "@frontend/gui/typography"
import { useTheme } from "@vero/gui-theme"
import { Icon } from "../themes/base"

export const NotFoundCard = (props: { title?: ReactNode; reason?: ReactNode; children?: ReactNode }) => {
	const theme = useTheme()
	return (
		<CollapsibleCard expanded={true}>
			<Row columnAlign="center">
				<Box
					borderSize="circle"
					padding="M"
					style={{
						maxHeight: theme.sizes.XL,
						maxWidth: theme.sizes.XL,
					}}
				>
					<Icon type="Error" size="IconLarge" />
				</Box>
				<Column>
					<Text heading style={{ wordBreak: "break-all" }} size="XXL">
						{props.title}
					</Text>
					<Row columnAlign="end" itemPadding="XS">
						<Text color="negative" size="XL">
							{props.reason}
						</Text>
					</Row>
				</Column>
			</Row>
			{props.children}
		</CollapsibleCard>
	)
}
