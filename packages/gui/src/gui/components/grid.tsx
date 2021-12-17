import { Row } from "@frontend/gui/components/layout/row-column"
import { Text } from "@frontend/gui/typography"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { useTheme } from "@vero/gui-theme"

type GridInfo = {
	cellWidth: number
	gridHeight: number
	xGridAlign: "left" | "right"
	gridOverflowLength: number
}

export const Grid = (props: {
	xLength: number
	yLength: number
	xLabels: string[]
	yLabels: string[]
	cellWidth?: number
	xGridAlign?: "left" | "right"
	renderYBar?: (i: number, gridInfo: GridInfo) => ReactNode
	renderXBar?: (i: number, gridInfo: GridInfo) => ReactNode
}) => {
	let [cellWidth, setCellWidth] = useState(props.cellWidth || 30)

	if (props.cellWidth) {
		cellWidth = props.cellWidth
	}

	const gridHeight = 200
	const stepCount = props.yLength - 1
	const xLength = props.xLength
	const xGridAlign: "left" | "right" = props.xGridAlign || "left"
	const theme = useTheme()
	const divRef = useRef<HTMLDivElement | null>(null)
	let gridOverflowLength = theme.sizes.S

	useEffect(() => {
		if (props.cellWidth) return
		if (!divRef.current) return

		const observer = new ResizeObserver(([entry]) => {
			if (entry.contentRect.width > 0 && props.xLength > 0) setCellWidth(entry.contentRect.width / props.xLength)
		})

		observer.observe(divRef.current)

		return () => observer.disconnect()
	})

	const YLine = (props: { label: string; i: number }) => {
		const theme = useTheme()
		return (
			<div
				style={{
					position: "absolute",
					backgroundColor: theme.colors.grid,

					width: theme.strokeWidth,
					height: gridHeight + gridOverflowLength * 2,
					bottom: -gridOverflowLength,
					[xGridAlign]: (props.i + (xGridAlign === "right" ? 1 : 0)) * cellWidth,
				}}
			>
				<Text weak size="S" style={{ position: "absolute", top: gridHeight + gridOverflowLength, left: theme.sizes.XXXS }}>
					{props.label}
				</Text>
			</div>
		)
	}

	const XLine = (props: { i: number; label: string }) => {
		const theme = useTheme()
		const w = xLength * cellWidth

		let yAlignment = 0
		if (props.label.startsWith("+")) {
			yAlignment = 100
		} else if (props.label.startsWith("-")) {
			yAlignment = -0
		} else if (props.label === "0") {
			yAlignment = 50
		}

		const thickLine = props.label === "0"

		return (
			<div
				style={{
					position: "absolute",
					backgroundColor: thickLine ? theme.colors.lighter : theme.colors.grid,
					height: thickLine ? theme.strokeWidthThick : theme.strokeWidth,
					width: w + gridOverflowLength * 2,
					[xGridAlign]: xGridAlign === "right" ? -gridOverflowLength : -gridOverflowLength, //barWidth + barMargin + gridOverflowLength * 2,
					bottom: props.i * (gridHeight / stepCount),
				}}
			>
				<Text
					weak
					size="S"
					minimumSize="S"
					noAlignmentHacks
					style={{
						width: props.label.length === 1 ? theme.textSizes.M : theme.textSizes.S,
						position: "absolute",
						textAlign: "right",
						left: w + theme.sizes.XXS + (xGridAlign === "right" ? gridOverflowLength : gridOverflowLength),
						transform: "translateY(calc(-100% + " + yAlignment.toString() + "%))",
					}}
				>
					{props.label}
				</Text>
			</div>
		)
	}

	let yLines = []

	for (let i = 0; i < props.xLength; i++) {
		let i2 = -i + props.xLength - 1

		if (xGridAlign === "left") {
			i2 = i
		}

		yLines[i] = <YLine key={i.toString()} i={i} label={props.xLabels[i2]} />
	}

	let xLines = []

	for (let i = 0; i < props.yLength; i++) {
		xLines[i] = <XLine key={i.toString()} i={i} label={props.yLabels[i]} />
	}

	let yBars = []

	if (props.renderYBar) {
		for (let i = 0; i < props.xLength; i++) {
			yBars[i] = props.renderYBar(i, { cellWidth: cellWidth, gridHeight, xGridAlign, gridOverflowLength })
		}
	}

	let xBars = []

	if (props.renderXBar) {
		for (let i = 0; i < props.yLength; i++) {
			xBars[i] = props.renderXBar(i, { cellWidth: cellWidth, gridHeight, xGridAlign, gridOverflowLength })
		}
	}
	return (
		<div style={{ paddingBottom: theme.sizes.S }}>
			<div style={{ marginRight: theme.sizes.M }} ref={divRef}>
				<Row
					style={{
						position: "relative",
						height: gridHeight,
						minHeight: gridHeight,
					}}
					itemPadding="none"
				>
					{xLines}
					{yLines}
					{<YLine i={xGridAlign === "right" ? -1 : yLines.length} label=""></YLine>}
					<div
						style={{
							position: "absolute",
							[xGridAlign]: 0,
							bottom: theme.strokeWidth,
							width: (xLines.length + 1) * cellWidth,
							height: gridHeight,
						}}
					>
						{yBars}
					</div>
					{xBars}
				</Row>
			</div>
		</div>
	)
}
