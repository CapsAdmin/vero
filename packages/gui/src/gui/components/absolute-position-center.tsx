import React, { ReactNode } from "react"

export const AbsolutePositionCenter = (props: { children: ReactNode; fixed?: boolean }) => (
	<div
		style={{
			position: props.fixed ? "fixed" : "absolute",
			left: "50%",
			top: "50%",
			zIndex: 10,
		}}
	>
		<div
			style={{
				transform: "translate(-50%, -50%)",
			}}
		>
			{props.children}
		</div>
	</div>
)
