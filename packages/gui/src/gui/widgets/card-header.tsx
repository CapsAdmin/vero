import { Box } from "@frontend/gui/components/box"
import { URL } from "@frontend/gui/components/interactive/url"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { ThemeIcon, useContrastedColor, Icon } from "@vero/gui-theme"
import React from "react"
import { H3 } from "../showcase/typography"
export const CardHeader = (props: { title: string; icon?: ThemeIcon; url?: string }) => {
	const titleColor = useContrastedColor("cardHeader")
	const urlColor = useContrastedColor("cardHeader", ["urlForeground", "urlBackground"])
	return (
		<Column>
			<Box borderSize="small" color="cardHeader" padding="XS">
				<Row rowAlign="space between" columnAlign="center">
					<Row itemPadding="S" columnAlign="center">
						{props.icon ? <Icon size="IconMedium" type={props.icon}></Icon> : null}
						<H3 color={titleColor}>{props.title}</H3>
					</Row>
					{props.url ? (
						<URL url={props.url} color={urlColor}>
							Se mer
						</URL>
					) : null}
				</Row>
			</Box>
		</Column>
	)
}
