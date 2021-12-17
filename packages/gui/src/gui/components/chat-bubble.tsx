import React, { ReactNode } from "react"
import { useTheme } from "@vero/gui-theme"

export const ChatBubble = (props: { children: ReactNode; hide?: boolean; notail?: boolean; tailLeft?: boolean }) => {
	const theme = useTheme()

	const tailTransform = props.tailLeft ? "translate(-25%, -30%) scaleY(-1) scaleX(-1) rotate(150deg)" : "translate(280%, 60%) scaleY(-1) scaleX(-1) rotate(90deg)"

	return (
		<div
			style={{
				opacity: props.hide ? 0 : 1,
				transition: "all 500ms cubic-bezier(0.000, 0.975, 0.695, 0.675)",
				display: "flex",
				flexDirection: "column",
				padding: "0",
				paddingBottom: "20px",
			}}
		>
			<div
				style={{
					background: theme.colors.chatbubble,
					minWidth: 160,
					borderRadius: theme.borderSizes.big,
					boxShadow: theme.shadow,
					padding: theme.sizes.L,
					whiteSpace: "pre-wrap",
					display: "flex",
				}}
			>
				{props.children}
			</div>

			{props.notail ? null : (
				<svg
					style={{
						transform: tailTransform,
						margin: "-20px",
						display: "inline",
					}}
					width="30"
					height="30"
					viewBox="-5 0 28 19"
					fill={theme.colors.chatbubble}
					xmlns="http://www.w3.org/2000/svg"
				>
					<path fillRule="evenodd" clipRule="evenodd" d="M27.2292 7.66625C27.2292 7.66625 8.71504 11.5258 0.0745948 0.563246C5.86343 16.4326 27.2292 18.9427 27.2292 18.9427V7.66625Z" />
				</svg>
			)}
		</div>
	)
}
