import moment from "moment"
import React from "react"
import { useTheme } from "../theme"
import { FormatNumber } from "../translation"
import { Grid } from "./grid"

export const GraphSpline = (props: { lines: { color: string; values: { x: Date; y: number }[] }[] }) => {
	const theme = useTheme()

	let yMax = 0
	let xMin = 100
	let yLabels = []
	let xLabels = []
	// a sorted array of unique dates (in milliseconds)
	let allDates = [...new Set(props.lines.flatMap((l) => l.values.map((v) => moment(v.x).startOf("day").toDate().getTime())))].sort((a, b) => a - b)

	const firstDate = new Date(allDates[0])

	// Make a new map with X "coordinates" instead of Dates for easier calculations in SVG
	let lineColorAndRelativeValues = new Map<string, { x: number; y: number }[]>()

	// Create a new array for each line color
	for (const line of props.lines) {
		lineColorAndRelativeValues.set(line.color, [])

		let newYMax = Math.ceil(
			Math.max(
				line.values.map(({ y }) => Math.abs(y)).reduce((a, b) => Math.max(a, b)),
				10,
			),
		)
		// Input all x and y values for each color
		for (const value of line.values) {
			lineColorAndRelativeValues.get(line.color)?.unshift({ x: moment(value.x).diff(firstDate, "days"), y: value.y })
		}
		// lineColorAndRelativeValues.get(line.color)?.reverse()
		newYMax = Math.round(newYMax / 10) * 10
		yMax = Math.max(newYMax, yMax)

		let newXMin = Math.max(line.values[0].x.getDate(), 0)
		xMin = Math.min(newXMin, xMin)
	}

	// Make labels for the bottom row
	for (let ms of allDates) {
		xLabels.push(moment(ms).format("D"))
	}

	// Make labels for the right
	for (let i = -yMax; i < yMax + 1; i += yMax / 2) {
		let str = (i > 0 ? "+" : "") + FormatNumber(i)
		if (str === "-0" || str === "−0" || str === "+0") {
			str = "0"
		}
		yLabels.push(str)
	}

	return (
		<Grid
			xLabels={xLabels}
			yLabels={yLabels}
			xLength={xLabels.length}
			yLength={yLabels.length}
			renderYBar={(index, { cellWidth, gridHeight, xGridAlign }) => {
				let lines = []
				// Loop through line colors
				for (let line of lineColorAndRelativeValues.keys()) {
					let pathCommands = ""
					let prevX
					let prevY
					// Create SVG coordinates for the line
					for (let value of lineColorAndRelativeValues.get(line)!) {
						let y = (value.y / yMax) * 0.5 + 0.5

						y = (-value.y / yMax) * 0.5 + 0.5
						const x = value.x / (xLabels.length - 1)
						const svgX = x * cellWidth * (xLabels.length - 1)
						const svgY = y * gridHeight + 1

						pathCommands += `M${prevX || svgX},${prevY || svgY} L${svgX},${svgY} `
						prevX = svgX
						prevY = svgY
					}
					// push it in, yeah baby, just like that
					lines.push(
						<svg
							key={lines.length + index.toString()}
							style={{
								left: 0,
								top: 0,
								position: "absolute",
								width: cellWidth * xLabels.length,
								height: gridHeight,
							}}
						>
							<path d={pathCommands} strokeWidth={theme.strokeWidth} stroke={line} fill="transparent" />
						</svg>,
					)
				}

				return lines
			}}
		/>
	)
}

export type SplinegraphData = Parameters<typeof GraphSpline>[0]["lines"]
