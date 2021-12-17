import moment from "moment"
import React from "react"
import { ThemeColor, useTheme } from "@vero/gui-theme"
import { FormatNumber } from "../translation"
import { Grid } from "./grid"
import { Row } from "./layout/row-column"

export const GraphSplineAccuracy = (props: { values: { x: Date; y: number }[]; timeWindow: { neutral: number; negative: number } }) => {
	const theme = useTheme()

	let yMax = Math.ceil(
		Math.max(
			props.values.map(({ y }) => Math.abs(y)).reduce((a, b) => Math.max(a, b)),
			60,
		),
	)
	yMax = Math.round(yMax / 10) * 10

	let yLabels = []
	for (let i = -yMax; i <= yMax; i += yMax / 3) {
		let str = (i > 0 ? "+" : "") + FormatNumber(i)
		if (str === "-0" || str === "−0" || str === "+0") {
			str = "0"
		}
		yLabels.push(str)
	}

	let xMin = Math.max(props.values[0].x.getHours(), 0)
	let xMax = Math.min(props.values[props.values.length - 1].x.getHours(), 24)
	let xLabels = []
	for (let i = xMin; i <= xMax; i++) {
		xLabels.push(FormatNumber(i))
	}

	return (
		<Grid
			xLabels={xLabels}
			yLabels={yLabels}
			xLength={xLabels.length}
			yLength={yLabels.length}
			renderYBar={(index, { cellWidth, gridHeight, xGridAlign }) => {
				let bars = []
				for (let value of props.values) {
					let color: ThemeColor = "positive"
					let time = Math.abs(value.y) * 1000

					if (time <= props.timeWindow.neutral) {
						color = "positive"
					} else if (time <= props.timeWindow.negative) {
						color = "neutral"
					} else if (time > props.timeWindow.negative) {
						color = "negative"
					}

					const y = (value.y / yMax) * 0.5 + 0.5
					let startTime = moment(value.x).startOf("day").set("hour", xMin).toDate().getTime()

					const x = (value.x.getTime() - startTime) / 1000 / 60 / 60 / (xLabels.length - 1)
					bars.push(
						<Row
							key={x.toString()}
							style={{
								position: "absolute",
								bottom: y * gridHeight,
								left: x * cellWidth * (xLabels.length - 1),
							}}
						>
							<div
								style={{
									background: theme.colors[color],
									borderRadius: "50%",
									transform: "translate(calc(-50%), calc(50%))",
									width: 6,
									height: 6,
									zIndex: 1,
								}}
							></div>
						</Row>,
					)
				}

				let pathCommands = ""

				let prevX
				let prevY
				for (let value of props.values) {
					const y = (-value.y / yMax) * 0.5 + 0.5
					let startTime = moment(value.x).startOf("day").set("hour", xMin).toDate().getTime()
					const x = (value.x.getTime() - startTime) / 1000 / 60 / 60 / (xMax - xMin)
					const svgX = x * cellWidth * (xLabels.length - 1)
					const svgY = y * gridHeight + 1

					pathCommands += `M${prevX || svgX},${prevY || svgY} L${svgX},${svgY} `
					prevX = svgX
					prevY = svgY
				}

				pathCommands += " Z"

				bars.push(
					<svg
						key={index.toString()}
						style={{
							left: 0,
							top: 0,
							position: "absolute",
							width: cellWidth * xLabels.length,
							height: gridHeight,
						}}
					>
						<path d={pathCommands} strokeWidth={theme.strokeWidth} stroke={theme.colors.textForeground} fill="red" />
					</svg>,
				)

				return bars
			}}
		/>
	)
}

export type SplinegraphAccuracyData = Parameters<typeof GraphSplineAccuracy>[0]["values"]
