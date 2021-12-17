import React, { ReactNode } from "react"
import { ThemeColor, useTheme } from "../theme"
import { Grid } from "./grid"

const roundToNearest50 = (val: number) => val - (val % 50) + 50

const yHeight = 6

export const Bargraph = (props: {
	data: {
		x: string
		y: number
	}[]
	average: number
	description?: ReactNode
	title?: ReactNode
	averageColor: ThemeColor
	barColor?: ThemeColor
}) => {
	const theme = useTheme()

	const stepDivider = 1

	const yLabels = []
	const xLabels = props.data.map((val) => val.x)
	const values: number[] = props.data.map((val) => val.y)

	const maxValue = Math.max(...[props.average || 0, ...values])

	const stepValue = roundToNearest50(maxValue) / 5

	for (let i = 0; i < yHeight; i++) {
		yLabels.push((i * stepValue).toString())
	}

	return (
		<Grid
			cellWidth={props.description ? 25 : undefined}
			xGridAlign={props.description ? "right" : "left"}
			xLabels={xLabels}
			yLabels={yLabels}
			xLength={xLabels.length}
			yLength={yLabels.length}
			renderYBar={(index, { cellWidth, gridHeight, xGridAlign }) => {
				let bars = []

				for (let subIndex = 0; subIndex < stepDivider; subIndex++) {
					let i = index * stepDivider + subIndex
					const percentage = (values[i] || 0) / roundToNearest50(maxValue)

					let i2 = -i + values.length - 1

					if (xGridAlign === "left") {
						i2 = i
					}

					bars[subIndex] = (
						<div
							key={i2.toString()}
							style={{
								position: "absolute",
								width: cellWidth / stepDivider - 2,
								bottom: 0,
								[xGridAlign]: i2 * (cellWidth / stepDivider) + 1,
								height: percentage * gridHeight,
								background: props.barColor ? theme.colors[props.barColor] : theme.colors.barColorHorizontal,
								borderRadius: theme.borderSizes.small,
							}}
						></div>
					)
				}

				return bars
			}}
			renderXBar={(i, { gridHeight, xGridAlign, gridOverflowLength }) => {
				if (i !== 0) return null
				if (!props.average) return null

				if (props.description) {
					return (
						<div key={i.toString()}>
							<div
								style={{
									position: "absolute",
									bottom: (props.average / roundToNearest50(maxValue)) * gridHeight + "px",
									width: "calc(100% + " + (theme.sizes.XXS + gridOverflowLength * 2) + "px)",
								}}
							>
								<theme.lineStyle.Render horizontal={true} color={theme.colors[props.averageColor]} strong={true} />
							</div>
							<div
								style={{
									position: "absolute",
									bottom: (props.average / roundToNearest50(maxValue)) * gridHeight + theme.strokeWidthThick + theme.sizes.XXS,
									[xGridAlign === "right" ? "left" : "right"]: 0,
								}}
							>
								{props.title}
							</div>
							<div
								style={{
									position: "absolute",
									bottom: (props.average / roundToNearest50(maxValue)) * gridHeight - theme.sizes.XXS,
									transform: "translateY(100%)",
									[xGridAlign === "right" ? "left" : "right"]: 0,
								}}
							>
								{props.description}
							</div>
						</div>
					)
				}

				return (
					<div key={i.toString()}>
						<div
							style={{
								opacity: 0.9,
								background: theme.colors.card,
								position: "absolute",
								bottom: (props.average / roundToNearest50(maxValue)) * gridHeight + theme.strokeWidthThick,
								[xGridAlign === "right" ? "left" : "right"]: -theme.sizes.XXXS,
							}}
						>
							{props.title}
						</div>
						<div
							style={{
								position: "absolute",
								bottom: (props.average / roundToNearest50(maxValue)) * gridHeight + "px",
								width: "calc(100% + " + theme.sizes.XXS + "px)",
							}}
						>
							<theme.lineStyle.Render horizontal={true} color={theme.colors[props.averageColor]} strong={true} />
						</div>
					</div>
				)
			}}
		></Grid>
	)
}
