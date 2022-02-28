import React, { CSSProperties } from "react"
import { useTheme } from "@vero/gui-theme"
import { Background } from "./background"

export const ThemeBackground = (props: { style?: CSSProperties }) => {
	const theme = useTheme()

	return (
		<Background
			containerStyle={{
				position: "fixed",
				left: 0,
				top: 0,
				width: "100vw",
				height: "100vh",
				background: theme.colors.background,
				zIndex: -1,
			}}
			backgroundStyle={{
				height: "100vh",
				backgroundSize: "2000px",
				// backgroundPosition: `${(Math.random() * 2 - 1) * 500}px ${(Math.random() * 2 - 1) * 500}px`,

				mixBlendMode: "revert",
				...theme?.backgroundStyle,
				...props.style,
			}}
		></Background>
	)
}
