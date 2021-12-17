import { moment } from "@frontend/app/thirdparty"
import React, { ReactNode } from "react"
import { ThemeColor, useTheme } from "@vero/gui-theme"
import { Grid } from "./grid"

const roundToNearest50 = (val: number) => val - (val % 50) + 50

const yHeight = 6
const WEEK = 7
const dayOfWeekNorwegian = ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø"]

export const BargraphDates = (props: {
	range: "year" | "month" | "week" | "day"
	data: {
		x: Date
		y: number
	}[]
	average: number
	description?: ReactNode
	title?: ReactNode
	averageColor: ThemeColor
	barColor?: ThemeColor
}) => {
	const theme = useTheme()

	const stepDivider = props.range === "week" ? 1 : WEEK

	const yLabels = []
	const xLabels = []
	const values: number[] = []

	if (props.data[0]) {
		let startDate = moment(props.data[0].x).startOf(props.range)
		let endDate = moment(props.data[0].x).endOf(props.range)

		let temp = new Map<string, number>()

		let m = moment(startDate)
		while (m.isBefore(endDate)) {
			temp.set(m.toDate().toDateString(), 0)
			m.add(1, "day")
		}

		for (let day of props.data) {
			temp.set(new Date(day.x).toDateString(), day.y)
		}

		for (let [dateString, value] of temp.entries()) {
			let date = new Date(dateString)

			if (props.range === "week") {
				xLabels.push(dayOfWeekNorwegian[date.getDay()].toString())
			} else {
				if ((date.getDate() - 1) % stepDivider === 0) {
					xLabels.push(date.getDate().toString())
				}
			}

			values.push(value)
		}
	}

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
								opacity: 0.8,
								background: theme.colors.card,
								position: "absolute",
								bottom: (props.average / roundToNearest50(maxValue)) * gridHeight + theme.strokeWidthThick,
								[xGridAlign === "right" ? "left" : "right"]: 0,
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

export type StatisticDay = Parameters<typeof BargraphDates>[0]["data"][0]
