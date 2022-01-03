import { color_util } from "@vero/util/colors"
import { ReactElement, useEffect, useState } from "react"
import { useTheme } from "."
import { IconProps } from "./themes/base"

export const SVG = (render: (color: string) => ReactElement) => {
	return (props: IconProps) => {
		const theme = useTheme()
		const size = props.size || theme.sizes.XXL

		return (
			<div
				style={{
					width: size || 42,
					height: size || 42,
					minWidth: size || 42,
					minHeight: size || 42,
					display: "inline-block",
					...theme.iconStyle,
					...props.style,
				}}
			>
				{render(props.color || theme.colors.textForeground)}
			</div>
		)
	}
}

export const PNG = (promise: Promise<{ default: string }>) => {
	return (props: IconProps) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [image, setImage] = useState<string>()

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			let unmounted = false

			promise.then((blob) => {
				if (unmounted) return
				setImage(blob.default)
			})

			return () => {
				unmounted = true
			}
		}, [setImage])

		const dimensions = typeof props.size == "string" ? parseFloat(props.size) : props.size || 16

		if (props.color) {
			let [r, g, b] = color_util.ColorToRGB(props.color || "white")
			let id = "color" + r + "_" + g + "_" + b

			return (
				<svg width={props.size} height={props.size} style={props.style}>
					<filter id={id}>
						<feColorMatrix
							type="matrix"
							values={`
								${r / 255} 0 0 0 0
								0 ${g / 255} 0 0 0 
								0 0 ${b / 255} 0 0 
								0 0 0 1 0
							`}
						/>
					</filter>

					<image
						style={{
							width: props.size,
							height: props.size,
						}}
						filter={"url(#" + id + ")"}
						//preserveAspectRatio="xMinYMin slice"
						xlinkHref={image}
					/>
				</svg>
			)
		}

		return (
			<img
				style={{
					width: dimensions,
					height: dimensions,
					minWidth: dimensions,
					minHeight: dimensions,
					imageRendering: "crisp-edges",
					display: "block",
					...props.style,
				}}
				aria-label={"icon"}
				src={image}
			></img>
		)
	}
}
