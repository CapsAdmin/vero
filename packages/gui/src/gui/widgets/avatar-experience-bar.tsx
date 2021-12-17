import { useUserData } from "@frontend/api/driver-resources/userdata"
import { HorizontalPercentageBar } from "@frontend/gui/components/horizontal-percentage-bar"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { UserAvatar } from "@frontend/gui/components/user-avatar"
import React from "react"
import { Text } from "../typography"
import { avatar } from "./avatar"

const LEVELFACTOR = 1.71
export const driverPointsToLevel = (sp: number) => {
	let level = 1
	let neededSP = 300
	let currentSP = sp

	while (sp >= 300 + level * LEVELFACTOR) {
		neededSP = 300 + level * LEVELFACTOR
		sp -= neededSP
		level++
		currentSP = sp
	}

	return {
		level,
		currentSP,
		neededSP,
	}
}

export const AvatarExperienceBar = (props: { driverPoints: number; levelRef?: React.RefObject<HTMLDivElement>; spBarRef?: React.RefObject<HTMLDivElement> }) => {
	const userdata = useUserData()
	const { currentSP, neededSP } = driverPointsToLevel(props.driverPoints)

	return (
		<Row itemPadding="XS" columnAlign="center">
			{/* <Row rowAlign="space evenly" columnAlign="center"> */}
			<UserAvatar key={userdata.id} driverPoints={props.driverPoints} data={userdata.avatar || avatar.defaultAvatar} lvlScale={1.35} />
			{/* </Row> */}
			<Column style={{ flex: 1 }} itemPadding="XS">
				<Text style={{ flex: 1 }} strong data-hj-suppress>
					<div className="nickName">{userdata.nickname}</div>
				</Text>
				<Text>Pakkesjåfør</Text>
				<div ref={props.spBarRef}>
					<HorizontalPercentageBar thin color="driverPoints" value={currentSP / neededSP} />
				</div>
				<Text color="driverPoints" style={{ flex: 1, placeSelf: "flex-end" }}>
					{Math.round(currentSP)}/{Math.round(neededSP)}
				</Text>
			</Column>
		</Row>
	)
}
