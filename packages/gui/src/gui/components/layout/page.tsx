import { useTheme } from "@vero/gui-theme"
import { Header } from "@frontend/gui/widgets/header"
import { useAnimation } from "@vero/util/animation"
import { usePageScroll } from "@vero/util/pages"
import { useMediaQuery } from "@vero/util/react-hooks"
import React, { CSSProperties, ReactNode } from "react"
import { Gutter } from "./gutter"
import { PageColumn } from "./row-column"

export const Page = (props: { style?: CSSProperties; children?: ReactNode; bottomHeader?: () => ReactNode; renderHeader?: (minified: boolean) => ReactNode; maxWidth?: number | string }) => {
	const theme = useTheme()
	const query = useMediaQuery("(min-width: 350px)")
	const minified = usePageScroll(20)
	const divRef = useAnimation<HTMLDivElement>({
		duration: 500,
		opacity: [{ value: 0, duration: 0 }, { value: 0 }, { value: 1 }],
		scale: [{ value: 0.97, duration: 0 }, { value: 0.97 }, { value: 1 }],
		easing: "linear",
	})

	return (
		<>
			{props.renderHeader ? props.renderHeader(minified) : <Header minified={minified} />}
			<div
				id="background"
				ref={divRef}
				style={{
					marginLeft: "auto",
					marginRight: "auto",
					maxWidth: props.maxWidth || "1300px",
					padding: query ? theme.sizes.M : theme.sizes.XXS,
					paddingTop: theme.sizes.M,
					paddingBottom: theme.sizes.M,
				}}
			>
				<PageColumn>
					<Gutter size="none" />
					{props.children}
				</PageColumn>
			</div>
		</>
	)
}
