import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react"
import { Showcase } from "../showcase"
import { useTheme } from "../theme"
import { Text } from "../typography"
import { Box } from "./box"
import { Interactive } from "./interactive/interactive"
import { Row } from "./layout/row-column"

export const Selector = (props: { selected?: number; onSelect: (i: number, reactNode: ReactNode) => void; children: ReactNode }) => {
	const [selected, setSelected] = useState(props.selected || 0)
	const highlightRef = useRef<HTMLDivElement | null>(null)
	const refs = useRef<(HTMLElement | null)[]>([])

	const theme = useTheme()
	const children = React.Children.toArray(props.children)

	const updateSize = (i: number, withAnimation: boolean) => {
		let to = highlightRef.current
		let from = refs.current[i]

		if (!from) return
		if (!to) return

		let rect = from.getBoundingClientRect()

		if (withAnimation) {
			to.style.transition = "all 150ms cubic-bezier(0, 0.55, 0.45, 1)"
		} else {
			to.style.transition = ""
		}

		to.style.left = rect.left + "px"
		//to.style.top = rect.top + "px"
		to.style.width = rect.width + "px"
		to.style.height = rect.height + "px"
	}

	useEffect(() => {
		// update size once
		updateSize(selected, false)
	}, [selected])
	useEffect(() => {
		let cb = () => {
			updateSize(selected, false)
		}
		window.addEventListener("resize", cb)

		return () => {
			window.removeEventListener("resize", cb)
		}
	}, [selected])

	return (
		<Box color="selectorBackground" borderSize="small" padding="none">
			<Row
				rowAlign="space between"
				itemPadding="none"
				columnAlign="center"
				style={{
					height: theme.sizes.L,
				}}
			>
				<div
					ref={highlightRef}
					style={{
						position: "absolute",
						width: 0,
						height: 0,
						zIndex: 0,
						display: "flex",
						flex: 1,
					}}
				>
					<div
						style={{
							flex: 1,
							margin: theme.sizes.XXXS,
							background: theme.colors.selectorForeground,
							borderRadius: theme.borderSizes.small,
						}}
					></div>
				</div>
				{children.map((element, i, arr) => {
					let additionalStyle: CSSProperties | null = null

					if (i === 0) {
						additionalStyle = {
							borderTopLeftRadius: theme.borderSizes.small,
							borderBottomLeftRadius: theme.borderSizes.small,
						}
					} else if (i === arr.length - 1) {
						additionalStyle = {
							borderTopRightRadius: theme.borderSizes.small,
							borderBottomRightRadius: theme.borderSizes.small,
						}
					}

					return (
						<Interactive
							key={i}
							refContainer={(e) => {
								refs.current[i] = e
							}}
							style={{
								flex: 1,
								height: theme.sizes.L,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								...additionalStyle,
							}}
							onPressed={() => {
								setSelected(i)
								props.onSelect(i, children[i])
								updateSize(i, true)
							}}
						>
							<Text
								noAlignmentHacks
								size="M"
								minimumSize="M"
								style={{ zIndex: 1, transition: "color 150ms cubic-bezier(0, 0.55, 0.45, 1)" }}
								color={selected === i ? "selectorTextForeground" : "selectorTextBackground"}
							>
								{element}
							</Text>
						</Interactive>
					)
				})}
			</Row>
		</Box>
	)
}
Showcase("selector", () => {
	return <Selector onSelect={(i, element) => {}}>{["month", "week"]}</Selector>
})
