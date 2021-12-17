import { Box } from "@frontend/gui/components/box"
import { Button } from "@frontend/gui/components/interactive/button"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { Line } from "@frontend/gui/components/line"
import { Showcase } from "@frontend/gui/showcase"
import { useTheme } from "@vero/gui-theme"
import { Text } from "@frontend/gui/typography"
import React from "react"
import { IoMdStar, IoMdStarOutline } from "react-icons/io"

Showcase("ff7", () => {
	const theme = useTheme()
	return (
		<Box>
			<Column itemPadding="XS">
				<Text heading style={{ color: "#9FB6CE" }}>
					Refocus Materia
				</Text>
				<div
					style={{
						position: "relative",
						display: "inline-block",
					}}
				>
					<Line></Line>
				</div>

				<Text style={{ color: "#0B8AB7" }}>
					The knowledge and wisdom of the Ancients is held in the materia. Anyone with this knowledge can freely use the powers of the Land and the Planet. That knowledge interacts between
					ourselves and the planet calling up magic... or so they say.
				</Text>
				<div
					style={{
						width: 50,
						height: 50,
					}}
				>
					<img
						alt="ff7 materia"
						src="https://vignette.wikia.nocookie.net/sparaverse/images/9/9a/Black-Orb.png/revision/latest?cb=20161025072800"
						style={{
							width: 50,
							height: 50,
							position: "absolute",
							mixBlendMode: "hard-light",
							filter: "sepia(1) saturate(1) hue-rotate(-120deg)",
						}}
					/>
				</div>
				<Column itemPadding="XS" style={{ width: 100 }}>
					<Row itemPadding="none" columnAlign="center">
						<Text>Lv.</Text>
						<IoMdStar
							style={{
								filter: "drop-shadow(1.5px 1.5px 0px rgba(0,0,0,0.5))",
							}}
							size={theme.sizes.M}
							color={theme.colors.neutral}
						></IoMdStar>
						<IoMdStarOutline
							style={{
								filter: "drop-shadow(1.5px 1.5px 0px rgba(0,0,0,0.5))",
							}}
							size={theme.sizes.M}
							color={theme.colors.neutral}
						></IoMdStarOutline>
						<IoMdStarOutline
							style={{
								filter: "drop-shadow(1.5px 1.5px 0px rgba(0,0,0,0.5))",
							}}
							size={theme.sizes.M}
							color={theme.colors.neutral}
						></IoMdStarOutline>
					</Row>

					<Row itemPadding="XS" columnAlign="end" rowAlign="space between">
						<Text style={{ color: "#9FB6CE" }}>AP</Text>
						<Text strong>
							104
							<Text color="lightest" size="XS">
								/250
							</Text>
						</Text>
					</Row>

					<div
						style={{
							position: "relative",
							background: theme.colors.black,
							height: 5,
							borderRadius: 2,
						}}
					>
						{/*<Line emphasis={1} width={1} vertical style={{ width: ((104 / 250) * 100) + "%", top: "50%" }}></Line>*/}
					</div>
				</Column>

				<Button>First Strike Materia</Button>
				<Button>Second Strike Materia</Button>
				<Button>Third Strike Materia</Button>
			</Column>
		</Box>
	)
})
