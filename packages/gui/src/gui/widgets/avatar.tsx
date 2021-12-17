import { color_util } from "@frontend/other/colors"
import { Hash, RandomRange } from "@frontend/other/other"
import parts from "@frontend/assets/avatars/parts.json"
import React, { useEffect, useState } from "react"
import { Box } from "../components/box"
import { Column } from "../components/layout/row-column"
import { useTheme } from "../theme"
import { Icon } from "../themes/base"
import { Text } from "../typography"
import { driverPointsToLevel } from "./avatar-experience-bar"
import { getAllPartsFromType } from "./avatar-selector"

export type AvatarData = {
	body: string
	eyes: string
	eyeColor: string
	hair: string
	hairColor: string
	face: string
	skinColor: string
	mouth: string
	nose: string
	eyebrow: string
	backgroundColor: string
}

export class avatar {
	static backgroundColors = ["#df7126", "#fbf236", "#99e550", "#6abe30", "#37946e", "#639bff", "#5fcde4", "#cbdbfc", "#76428a", "#d95763", "#d77bba"]
	static hairColors = [
		"#222034",
		"#45283c",
		"#663931",
		"#8f563b",
		"#df7126",
		"#d9a066",
		"#eec39a",
		"#fbf236",
		"#99e550",
		"#6abe30",
		"#37946e",
		"#4b692f",
		"#524b24",
		"#323c39",
		"#3f3f74",
		"#306082",
		"#5b6ee1",
		"#639bff",
		"#5fcde4",
		"#cbdbfc",
		"#9badb7",
		"#847e87",
		"#696a6a",
		"#595652",
		"#76428a",
		"#ac3232",
		"#d95763",
		"#d77bba",
		"#8f974a",
		"#8a6f30",
	]
	static skinColors = ["#663931", "#8F563B", "#C7AC78", "#D7C59A", "#D9A066", "#EEC39A", "#FFE0D5"]
	static eyeColors = ["#323C39", "#696A6A", "#306082", "#639BFF", "#4B692F", "#6ABE30", "#663931", "#8F563B"]

	static defaultAvatar: AvatarData = {
		body: "2",
		eyes: "1",
		eyeColor: "#4B692F",
		hair: "10",
		hairColor: "#45283c",
		face: "3",
		skinColor: "#df7126",
		mouth: "5",
		nose: "7",
		eyebrow: "1",
		backgroundColor: "#cbdbfc",
	}
	static getPart(partName: string) {
		if (partName in parts) {
			return { name: partName, ...parts[partName as keyof typeof parts] } as { name: string; outline: string[]; color: string[] }
		}
		return undefined
	}

	static GetRandomAvatarData(seed?: string) {
		const getRandomElement = <T extends string[]>(arr: T) => {
			const index = seed ? Math.abs(Hash(seed + arr.join())) % arr.length : Math.floor(RandomRange(0, arr.length - 1))
			return arr[index]
		}

		return {
			skinColor: getRandomElement(this.skinColors),
			face: getRandomElement(getAllPartsFromType("face")),
			hair: getRandomElement(getAllPartsFromType("hair")),
			eyeColor: getRandomElement(this.backgroundColors),
			backgroundColor: getRandomElement(this.backgroundColors),
			eyebrow: getRandomElement(getAllPartsFromType("eyebrow")),
			eyes: getRandomElement(getAllPartsFromType("eyes")),
			hairColor: getRandomElement(this.backgroundColors),
			mouth: getRandomElement(getAllPartsFromType("mouth")),
			nose: getRandomElement(getAllPartsFromType("nose")),
			body: getRandomElement(getAllPartsFromType("body")),
		}
	}
}

const Image = (props: { path: string; color?: string; z?: number; size: number }) => {
	const [image, setImage] = useState<any>()

	let id = "image_color_filter_" + props.color

	return (
		<div
			style={{
				zIndex: props.z,
				position: "absolute",
			}}
		>
			<svg style={{ width: 0, height: 0 }}>
				<filter id={id}>
					<feColorMatrix color-interpolation-filters="sRGB" type="matrix" values={color_util.FeColorMatrixFromCSSColor(props.color)} />
				</filter>
			</svg>
			<img
				alt={props.path}
				style={{
					filter: "url(#" + id + ")",
					width: props.size,
					height: props.size,
					transform: "translate(-3%, -2.5%) scale(1.25)",
				}}
				src={"assets/avatars/" + props.path}
			/>
		</div>
	)
}

export const Part = (props: { type: string; color?: string; size: number }) => {
	const part = avatar.getPart(props.type)

	if (!part) {
		return <Icon type="Error"></Icon>
	}

	return (
		<>
			{part.color.map((path, i) => (
				<Image key={path} size={props.size} z={-i + 1} color={props.color} path={path} />
			))}
			{part.outline.map((path, i) => (
				<Image key={path} size={props.size} z={-i + 1} path={path} />
			))}
		</>
	)
}

export const AvatarImage = (props: { data: AvatarData; size: number }) => (
	<Box
		padding="none"
		style={{
			background: props.data?.backgroundColor,
			position: "relative",
			width: props.size,
			minWidth: props.size,
			height: props.size,
			minHeight: props.size,
			borderRadius: "50%",
			overflow: "hidden",
			borderColor: color_util.Mix(props.data.backgroundColor, "#323c39", 0.5),
			borderStyle: "solid",
			zIndex: 0,
		}}
	>
		<Part size={props.size} type={"body." + props.data.body} />
		<Part size={props.size} type={"face." + props.data.face} color={props.data.skinColor} />
		<Part size={props.size} type={"eyes." + props.data.eyes} color={props.data.eyeColor} />
		<Part size={props.size} type={"eyebrow." + props.data.eyebrow} />
		<Part size={props.size} type={"hair." + props.data.hair} color={props.data.hairColor} />
		<Part size={props.size} type={"mouth." + props.data.mouth} />
		<Part size={props.size} type={"nose." + props.data.nose} />
	</Box>
)

export const AvatarWithLevel = (props: Parameters<typeof AvatarImage>[0] & { driverPoints: number }) => {
	const theme = useTheme()
	const lvlScale = 1.35
	return (
		<Column
			style={{
				position: "relative",
				width: props.size + theme.strokeWidthThick * 2,
				height: props.size,
			}}
			itemPadding="none"
		>
			<Box
				padding="none"
				borderSize="circle"
				style={{
					width: props.size,
					height: props.size,
					// border: 4,
					// minWidth: theme.sizes.L * 1.6,
					// minHeight: theme.sizes.L * 1.6,
					// borderRadius: "50%",
					position: "relative",
					// overflow: "hidden",

					borderColor: color_util.Mix(props.data.backgroundColor, "#323c39", 0.5),
					// borderWidth: 3,
					// borderStyle: "solid",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<AvatarImage size={props.size} data={props.data} />
			</Box>
			<div
				style={{
					borderRadius: "50%",
					border: 1,
					borderStyle: "solid",
					borderColor: theme.colors["gold"],
					backgroundColor: theme.colors.textBackground,
					position: "absolute",
					left: "80%",
					top: "80%",
					transform: lvlScale ? "scale(" + lvlScale + ", " + lvlScale + ") translate(-25%, -15%)" : undefined,
					width: theme.sizes["L"] - 2,
					height: theme.sizes["L"] - 2,
					textAlign: "start",
				}}
			>
				<Column itemPadding="XXXS" rowAlign="center">
					<Text
						size="XS"
						style={{
							color: color_util.Mix(theme.colors.textForeground, theme.colors.textBackground, 0.25),
							paddingTop: 2,
							textAlign: "center",
							letterSpacing: "-0.1em",
							// textShadow: "-1px 1px 1px " + color_util.Mix(theme.colors.textBackground, theme.colors.textForeground, 0.8),
						}}
					>
						lvl
					</Text>
					<Text
						size={"M"}
						minimumSize="M"
						strong
						color="gold"
						style={{
							WebkitTextStroke: "0.5px " + theme.colors.goldShadow,
							textAlign: "center",
							textShadow: `-0.5px 0.5px 0px ${theme.colors.goldShadow}`,
							letterSpacing: "-0.1em",
						}}
					>
						{driverPointsToLevel(props.driverPoints || 0).level}
					</Text>
				</Column>
			</div>
		</Column>
	)
}
