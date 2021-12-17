import { Column } from "@frontend/gui/components/layout/row-column"
import { Showcase } from "@frontend/gui/showcase"
import { useTheme } from "@frontend/gui/theme"
import anime from "animejs"
import { useRef, useState } from "react"
import { Clickable } from "./clickable"

export const ToggleSwitch = (props: { onChange?: (b: boolean) => void; on?: boolean }) => {
	const theme = useTheme()
	const knobRef = useRef<HTMLDivElement>(null)
	return (
		<Clickable
			containerStyle={{
				maxWidth: theme.sizes.XL * 1.5,
				minWidth: theme.sizes.XL * 1.5,
			}}
			style={{
				borderRadius: theme.sizes.L / 2,

				boxShadow: "inset 0px 0px 0px " + (props.on ? 17 : 0) + "px " + theme.colors.positive + ", 0px 0px 0px " + theme.strokeWidth + "px " + theme.colors["light"],
				transition: "box-shadow 200ms ease-in-out",

				cursor: "pointer",
			}}
			onClick={() => {
				if (props.onChange) {
					props.onChange(!!props.on)
				}
				anime({
					duration: 250,
					easing: "easeOutCirc",
					targets: [knobRef.current!],
					right: props.on ? ["0%", "100%"] : ["100%", "0%"],
				})
			}}
		>
			<div
				style={{
					marginLeft: theme.sizes.S,
					marginRight: theme.sizes.S,
					position: "relative",
					flex: 1,
					height: theme.sizes.L,
				}}
			>
				<div
					ref={knobRef}
					style={{
						position: "absolute",

						top: "50%",
						right: props.on ? "0%" : "100%",
						transform: "translate(50%, -50%)",
						boxShadow: props.on ? "0px 0px 1px 1px " + theme.colors.positive : "0px 0px 1px 1px " + theme.colors.light,
						transition: "box-shadow 200ms ease-in-out",

						background: "white",
						borderRadius: "50%",
						width: theme.sizes.L,
						height: theme.sizes.L,
					}}
				></div>
			</div>
		</Clickable>
	)
}
Showcase("switch", () => {
	let [on, setOn] = useState(false)
	let [on2, setOn2] = useState(false)
	return (
		<Column>
			<ToggleSwitch
				onChange={() => {
					setOn(!on)
				}}
				on={on}
			></ToggleSwitch>

			<ToggleSwitch
				onChange={() => {
					setOn2(!on2)
				}}
				on={on2}
			></ToggleSwitch>
		</Column>
	)
})
