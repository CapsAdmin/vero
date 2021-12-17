import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { ThemeColor, ThemeIcon } from "@frontend/gui/theme"
import React, { ReactNode } from "react"
import { Clickable } from "../components/interactive/clickable"
import { ShowModal } from "../components/modal-layer"
import { Icon } from "../themes/base"
import { FormatNumber } from "../translation"
import { Text } from "../typography"
export const LabelScore = (props: {
	score?: string
	unitIcon?: ThemeIcon
	quality100Percent?: boolean
	driverPoints?: number

	icon?: ThemeIcon
	textColor?: ThemeColor
	title: ReactNode
	shortDescription?: ReactNode
	modal?: JSX.Element
}) => {
	let DriverPoints = props.driverPoints ? (
		<Row itemPadding="XS" columnAlign="center">
			<Text size="M" minimumSize="M" color="driverPoints">
				{FormatNumber(props.driverPoints)}
			</Text>
			<Icon size="IconSmall" type="DriverPoints24"></Icon>
		</Row>
	) : null
	let node = (
		<Row columnAlign="center" rowAlign="space between" itemPadding="S">
			{props.icon ? <Icon type={props.icon} size="IconLarge"></Icon> : null}
			<Column itemPadding="S" style={{ flex: 1 }}>
				<Row rowAlign="space between" columnAlign="center">
					<Text size="M" minimumSize="M">
						{props.title}
					</Text>
					<Row itemPadding="XS" columnAlign="center">
						{props.score ? (
							<Text size="M" minimumSize="M" color={props.textColor}>
								{props.score}
							</Text>
						) : null}
						{props.unitIcon ? <Icon type={props.unitIcon} size="IconSmall" /> : null}
						{!props.score && props.driverPoints ? DriverPoints : null}
					</Row>
				</Row>
				<Row rowAlign="space between" columnAlign="center">
					{!props.shortDescription ? (
						<div></div>
					) : (
						<Text size="S" minimumSize="S" weak>
							{props.shortDescription}
						</Text>
					)}
					{props.quality100Percent ? (
						<Row itemPadding="XS" columnAlign="center">
							<Text size="M" minimumSize="M" color="positive">
								100%
							</Text>
							<Icon size="IconSmall" type="Checkmark24" color="positive"></Icon>
						</Row>
					) : props.driverPoints && props.score !== undefined ? (
						DriverPoints
					) : null}
				</Row>
			</Column>
		</Row>
	)

	if (props.modal) {
		return <Clickable onClick={() => ShowModal(() => props.modal!, {})}>{node}</Clickable>
	}

	return node
}
