import { Showcase } from "@frontend/gui/showcase"
import { TextSizes, ThemeColor } from "@vero/gui-theme"
import { Text } from "@frontend/gui/typography"
import React, { ReactNode } from "react"
import { Clickable } from "./clickable"

export const URL = (props: { url?: string; noAlignmentHacks?: boolean; onClick?: () => void; children?: ReactNode; size?: TextSizes; color?: ThemeColor }) => {
	return (
		<Clickable
			inline
			url={props.url}
			style={{
				cursor: "pointer",
			}}
			onClick={props.onClick}
		>
			<Text noAlignmentHacks={props.noAlignmentHacks} underline color={props.color || "urlForeground"} size={props.size}>
				{props.children}
			</Text>
		</Clickable>
	)
}

Showcase("url", () => {
	return (
		<div style={{ background: "yellow" }}>
			<URL
				onClick={() => {
					;(() => 0)()
				}}
			>
				weak
			</URL>
		</div>
	)
})
