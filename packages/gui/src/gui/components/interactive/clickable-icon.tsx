import React, { ReactNode } from "react"
import { Clickable } from "./clickable"

export const ClickableIcon = (props: { children?: ReactNode; onClick: () => void; disabled?: boolean; flex?: boolean }) => {
	return (
		<Clickable
			disabled={props.disabled}
			onClick={props.onClick}
			style={{
				width: 50,
				height: 50,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			containerStyle={
				props.flex
					? { flex: 1 }
					: {
							width: 50,
							height: 50,
					  }
			}
		>
			{props.children}
		</Clickable>
	)
}
