import React, { ReactNode } from "react"
import { ThemeColor, useTheme } from "../theme"

export const Line = (props: { color?: ThemeColor; strong?: boolean; vertical?: boolean; length?: string }) => {
	const theme = useTheme()

	return <theme.lineStyle.Render horizontal={!props.vertical} color={props.color as string} strong={props.strong || false} />
}

// tslint:disable-next-line: array-type
export function lineSeparated<T>(arr: T[], render: (val: T, i: number, arr: T[]) => ReactNode) {
	return arr.flatMap((item, i) => {
		if (!item) return undefined

		return [render(item, i, arr), i === arr.length - 1 ? null : <Line key={-i}></Line>]
	})
}
