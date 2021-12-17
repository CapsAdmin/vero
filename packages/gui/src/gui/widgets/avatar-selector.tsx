import parts from "assets/avatars/parts.json"
import React from "react"
import { Box } from "../components/box"
import { Clickable } from "../components/interactive/clickable"
import { Column, Row } from "../components/layout/row-column"
import { CardHeader } from "@frontend/gui/widgets/card-header"
import { useTheme } from "../theme"
import { avatar, AvatarData, Part } from "./avatar"

type ExtractPartTypes<T extends string> = T extends `${infer Category}.${string}` ? Category : never
type PartType = ExtractPartTypes<keyof typeof parts>

export const getAllPartsFromType = (partType: PartType) => {
	return Object.keys(parts)
		.filter((v) => v.startsWith(partType + "."))
		.map((v) => v.substr(partType.length + 1))
		.sort((a, b) => parseFloat(a.substring(partType.length + 1)) - parseFloat(b.substring(partType.length + 1)))
}

const PartSelector = (props: { partType: PartType; onSelect: (partName: string) => void; selected: string }) => {
	const parts = getAllPartsFromType(props.partType)
	const theme = useTheme()

	return (
		<div className="avatar-selector-scroll" style={{ overflowX: "auto", overflowY: "hidden" }}>
			<Row itemPadding="S">
				{parts.map((part, i) => {
					return (
						<Clickable
							key={part}
							onClick={() => {
								props.onSelect(part)
							}}
							interactiveStyle={{ touchAction: "pan-x pan-y" }}
							style={{ position: "relative" }}
						>
							<div
								style={{
									boxShadow: props.selected === part ? "inset 0 0 0 " + theme.strokeWidthThick + "px " + theme.colors.selectorTextForeground : undefined,
									background: theme.colors.selectorForeground,
									width: theme.sizes.IconLarge,
									height: theme.sizes.IconLarge,
									minWidth: theme.sizes.IconLarge,
									minHeight: theme.sizes.IconLarge,
									borderRadius: theme.borderSizes.small,
								}}
							>
								<Part size={theme.sizes.IconLarge} type={props.partType + "." + part} />
							</div>
						</Clickable>
					)
				})}
			</Row>
		</div>
	)
}

const ColorSelector = (props: { onSelect: (color: string) => void; colors: string[]; selected?: string }) => {
	const theme = useTheme()

	return (
		<div className="avatar-selector-scroll" style={{ overflowX: "auto", overflowY: "hidden" }}>
			<Row itemPadding="S">
				{props.colors.map((color) => {
					return (
						<Clickable
							key={color}
							onClick={() => {
								props.onSelect(color)
							}}
							interactiveStyle={{ touchAction: "pan-x pan-y" }}
						>
							<div
								style={{
									borderRadius: theme.borderSizes.small,
									boxShadow: props.selected === color ? "inset 0 0 0 " + theme.strokeWidthThick + "px " + theme.colors.selectorTextForeground : undefined,
									background: color,
									width: theme.sizes.IconLarge,
									height: theme.sizes.IconLarge,
								}}
							></div>
						</Clickable>
					)
				})}
			</Row>
		</div>
	)
}

export const AvatarSelector = (props: { data: AvatarData; onUpdate: (data: AvatarData) => void }) => {
	const update = (key: keyof AvatarData) => (val: string) => {
		props.onUpdate({ ...props.data, [key]: val })
	}

	return (
		<>
			<Column itemPadding="S">
				<Box style={{ marginLeft: -10, marginRight: -10 }} padding="S">
					<Column itemPadding="S">
						<CardHeader title="Hode"></CardHeader>
						<PartSelector partType="face" onSelect={update("face")} selected={props.data.face} />
						<ColorSelector onSelect={update("skinColor")} colors={avatar.skinColors} selected={props.data.skinColor} />
					</Column>
				</Box>
				<Box style={{ marginLeft: -10, marginRight: -10 }} padding="S">
					<Column itemPadding="S">
						<CardHeader title="Hår"></CardHeader>
						<PartSelector partType="hair" onSelect={update("hair")} selected={props.data.hair} />
						<ColorSelector onSelect={update("hairColor")} colors={avatar.hairColors} selected={props.data.hairColor} />
					</Column>
				</Box>
				<Box style={{ marginLeft: -10, marginRight: -10 }} padding="S">
					<Column itemPadding="S">
						<CardHeader title="Øyne"></CardHeader>

						<PartSelector partType="eyes" onSelect={update("eyes")} selected={props.data.eyes} />
						<ColorSelector onSelect={update("eyeColor")} colors={avatar.eyeColors} selected={props.data.eyeColor} />
					</Column>
				</Box>
				<Box style={{ marginLeft: -10, marginRight: -10 }} padding="S">
					<Column itemPadding="S">
						<CardHeader title="Nese"></CardHeader>

						<PartSelector partType="nose" onSelect={update("nose")} selected={props.data.nose} />
					</Column>
				</Box>
				<Box style={{ marginLeft: -10, marginRight: -10 }} padding="S">
					<Column itemPadding="S">
						<CardHeader title="Munn"></CardHeader>

						<PartSelector partType="mouth" onSelect={update("mouth")} selected={props.data.mouth} />
					</Column>
				</Box>
				<Box style={{ marginLeft: -10, marginRight: -10 }} padding="S">
					<Column itemPadding="S">
						<CardHeader title="Øyenbryn"></CardHeader>

						<PartSelector partType="eyebrow" onSelect={update("eyebrow")} selected={props.data.eyebrow} />
					</Column>
				</Box>
				<Box style={{ marginLeft: -10, marginRight: -10 }} padding="S">
					<Column itemPadding="S">
						<CardHeader title="Uniform"></CardHeader>
						<PartSelector partType="body" onSelect={update("body")} selected={props.data.body} />
					</Column>
				</Box>
				<Box style={{ marginLeft: -10, marginRight: -10 }} padding="S">
					<Column itemPadding="S">
						<CardHeader title="Bakgrunn"></CardHeader>
						<ColorSelector onSelect={update("backgroundColor")} colors={avatar.backgroundColors} selected={props.data.backgroundColor} />
					</Column>
				</Box>
			</Column>
		</>
	)
}
