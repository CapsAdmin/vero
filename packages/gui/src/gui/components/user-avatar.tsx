import { Column } from "@frontend/gui/components/layout/row-column"
import { Text } from "@frontend/gui/typography"
import { driverPointsToLevel } from "@frontend/gui/widgets/avatar-experience-bar"
import { color_util } from "@frontend/other/colors"
import React from "react"
import { ThemeSizes, useTheme } from "../theme"
import { AvatarImage, AvatarData } from "../widgets/avatar"
import { Box } from "./box"

export const UserAvatar = (props: { data: AvatarData; size?: ThemeSizes; lvlScale?: number; seed?: number; driverPoints?: number }) => {
	const theme = useTheme()
	return (
		<Column style={{ position: "relative" }} itemPadding="none">
			<Box
				padding="none"
				borderSize="circle"
				style={{
					width: theme.sizes[props.size || "XXL"],
					height: theme.sizes[props.size || "XXL"],
					// minWidth: theme.sizes.L * 1.6,
					// minHeight: theme.sizes.L * 1.6,
					// borderRadius: "50%",
					position: "relative",
					// overflow: "hidden",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<AvatarImage data={props.data} size={props.size ? theme.sizes[props.size] : 64} />
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
					transform: props.lvlScale ? "scale(" + props.lvlScale + ", " + props.lvlScale + ") translate(-25%, -25%)" : undefined,
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
							// textShadow: "-1px 1px 1px " + color_util.Mix(theme.colors.textBackground, theme.colors.textForeground, 0.8),
						}}
					>
						lvl
					</Text>
					<Text
						size={"M"}
						strong
						color="gold"
						style={{
							WebkitTextStroke: "0.5px " + theme.colors.goldShadow,
							textAlign: "center",
							textShadow: `-0.5px 0.5px 0px ${theme.colors.goldShadow}`,
						}}
					>
						{driverPointsToLevel(props.driverPoints || 0).level}
					</Text>
				</Column>
			</div>
		</Column>
	)
}
