import React, { CSSProperties, ReactNode } from "react"

export const Background = (props: { children?: ReactNode; containerStyle?: CSSProperties; backgroundStyle?: CSSProperties; clipPath?: string }) => {
	return (
		<>
			<div
				style={{
					display: "inline-block",
					position: "relative",
					overflow: "hidden",
					background: "transparent",
					...props.containerStyle,
				}}
			>
				{props.clipPath ? (
					<svg style={{ position: "absolute" }} viewBox="0 0 500 500">
						<clipPath id="myPath" clipPathUnits="objectBoundingBox">
							<path d={props.clipPath} />
						</clipPath>
					</svg>
				) : null}

				<div
					style={{
						clipPath: props.clipPath ? "url(#myPath)" : undefined,
						content: " ",
						display: "block",
						position: "absolute",
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						height: "100%",
						width: "100%",
						zIndex: -1,
						background: props.backgroundStyle?.backgroundColor,
					}}
				></div>
				<div
					style={{
						// clipPath: "url(#myPath);",
						clipPath: props.clipPath ? "url(#myPath)" : undefined,
						content: " ",
						display: "block",
						position: "absolute",
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						height: "100%",
						width: "100%",
						zIndex: 1,
						...props.backgroundStyle,
					}}
				></div>

				{props.children}
			</div>
		</>
	)
}
