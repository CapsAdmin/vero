import { ReactNode } from "react"
import { Text } from "../typography"

export const ComingSoon = (props: { children?: ReactNode }) => {
	const angleTransform = "rotate(5deg)"
	return (
		<div style={{ position: "relative", background: "rgba(0,0,0,0.4)", padding: 5, margin: -5 }}>
			<div
				style={{
					filter: "grayscale(100%) blur(1px)",
					pointerEvents: "none",
				}}
			>
				{props.children}
			</div>
			<Text
				size="XXL"
				noAlignmentHacks
				backgroundColor="black"
				color="white"
				strong
				noWrap
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translateX(-50%) translateY(-100%) " + angleTransform,
				}}
			>
				KOMMER SNART
			</Text>
		</div>
	)
}
