import { useMediaQuery } from "@frontend/other/react"
import React, { CSSProperties, ReactNode } from "react"
import { useTheme } from "../theme"
import { Box } from "./box"
import { Column } from "./layout/row-column"

export const Card = (props: { children: ReactNode; style?: CSSProperties }) => {
	const wide = useMediaQuery("(min-width: 356px)")
	const theme = useTheme()
	return (
		<Box
			shadow
			padding="L"
			color="card"
			style={{
				paddingLeft: wide ? theme.sizes.M : theme.sizes.XS,
				paddingRight: wide ? theme.sizes.M : theme.sizes.XS,
				...props.style,
			}}
		>
			<Column>{props.children}</Column>
		</Box>
	)
}
