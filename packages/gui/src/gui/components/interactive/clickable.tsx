import { Showcase } from "@frontend/gui/showcase"
import { useTheme } from "@frontend/gui/theme"
import { location } from "@frontend/other/location"
import { PressSound } from "@frontend/other/sounds"
import anime, { AnimeParams } from "animejs"
import { StandardLonghandProperties } from "csstype"
import React, { CSSProperties, ReactNode, RefObject, useEffect, useRef, useState } from "react"
import { Column, Row } from "../layout/row-column"
import { Interactive } from "./interactive"

const ClickCircle = (props: {
	x: number | string
	y: number | string
	position: "fixed" | "absolute"
	ref?: RefObject<HTMLDivElement>
	color?: string
	blend?: StandardLonghandProperties<React.ReactText>["mixBlendMode"]
}) => (
	<div
		ref={props.ref}
		style={{
			position: props.position,
			top: typeof props.x === "string" ? props.x : props.x - 25 - 15,
			left: typeof props.y === "string" ? props.y : props.y - 25 - 15,

			//    transform: "translate(50%, 50%)",

			pointerEvents: "none",
			width: 100,
			height: 100,

			borderRadius: "50%",
			opacity: 0,

			background: props.color || "white",
			mixBlendMode: props.blend,
			// backgroundBlendMode: props.blend
		}}
	/>
)

export const Clickable = (props: {
	autoFocus?: boolean
	description?: string
	inline?: boolean
	children?: ReactNode
	disabled?: boolean
	onClick?: () => void
	style?: CSSProperties
	containerStyle?: CSSProperties
	interactiveStyle?: CSSProperties
	pressed?: boolean
	url?: string
	containerRef?: React.RefObject<HTMLDivElement>
	circleContainerRef?: React.RefObject<HTMLDivElement>
	interactiveRef?: React.RefObject<HTMLAnchorElement>
	className?: string

	noOverflow?: boolean
	noBounce?: boolean
	noSkew?: boolean
}) => {
	const [hovered, setHovered] = useState(false)
	const [pressed, setPressed] = useState(props.pressed || false)
	const [usingKeyboard, setUsingKeyboard] = useState(false)

	const [xyInner, setXYInner] = useState([0, 0])

	const circlePointer = useRef<HTMLDivElement>(null)
	const circleHighlight = useRef<HTMLDivElement>(null)

	const circleContainer = useRef<HTMLDivElement>(null)
	const interactiveContainer = useRef<HTMLDivElement>(null)
	const theme = useTheme()

	const firstTime = useRef(true)

	useEffect(() => {
		if (firstTime.current) {
			firstTime.current = false
			return
		}

		const b = props.pressed !== undefined ? props.pressed : pressed

		if (props.disabled && b) {
			return
		}

		if (!b && interactiveContainer.current) {
			interactiveContainer.current.style.transform = "perspective(140px) rotateY(" + 0 + "deg) rotateX(" + -0 + "deg)"
		}

		{
			const anim: AnimeParams = {
				duration: 250,
				targets: circlePointer.current!,
			}

			if (b) {
				anim.scale = 0.5
				anim.opacity = 0.15
				anim.easing = "easeOutQuint"
			} else {
				anim.scale = 0
				anim.opacity = 0
				if (hovered) {
					anim.easing = "easeInQuint"
				} else {
					anim.scale = undefined
					anim.easing = "linear"
				}
			}

			anime.remove(anim.targets!)
			anime(anim)

			anim.targets = circleHighlight.current!

			const rect = circleContainer.current!.getBoundingClientRect()
			const size = Math.max(rect.width, rect.height) * 2.2
			if (b) {
				anim.scale = size / 100
				anim.duration = 200
				anim.opacity = 0.25
			} else {
				anim.opacity = 0
			}

			anime.remove(anim.targets!)
			anime(anim)
		}
		if (props.noBounce) {
			return
		}

		{
			const anim: AnimeParams = {
				duration: 150,
				targets: circleContainer.current!,
			}

			const rect = circleContainer.current!.getBoundingClientRect()
			const size = Math.max(rect.width, rect.height)

			const amount = (1 / size) * 8

			if (b) {
				anim.scale = 1 - amount
				anim.easing = "spring(0, 100, 150, 25)"
			} else {
				anim.duration = 150
				anim.scale = [1 + amount, 1]
				anim.easing = "spring(0.25, 100, 105, 130)"
				anim.scale = 1

				if (!hovered) {
					anim.duration = 100
					anim.easing = "linear"
					anim.scale = 1
				}
			}

			anime.remove(anim.targets!)
			anime(anim)
		}
	}, [props.pressed, pressed, props.disabled, props.noBounce, hovered])

	return (
		<div
			className={props.className}
			ref={props.containerRef}
			style={{
				display: props.inline ? "inline-block" : "flex",
				opacity: props.disabled ? 0.5 : 1,
				...props.containerStyle,
			}}
		>
			<div
				ref={(e) => {
					;(circleContainer as any).current = e
					if (props.circleContainerRef && e) {
						;(props.circleContainerRef as any).current = e
					}
				}}
				style={{
					display: "flex",
					overflow: props.noOverflow ? undefined : "hidden",
					WebkitMaskImage: props.noOverflow ? undefined : "-webkit-radial-gradient(white, black)",

					position: "relative",
					padding: "10px",

					borderRadius: theme.borderSizes.big,
					// -webkit-mask-image: -webkit-radial-gradient(white, black)
					margin: usingKeyboard ? -10 - theme.strokeWidthThick : -10,
					border: usingKeyboard ? theme.strokeWidthThick + "px solid " + theme.colors.primary : undefined,

					// background: keyboardFocused ? "rgba(0,0,0,0.1)" : "transparent",
					// borderRadius: "2px",
					flex: 1,
				}}
			>
				<Interactive
					autoFocus={props.autoFocus}
					description={props.description}
					onInteracted={async () => {
						if (props.disabled) {
							return
						}
						if (props.onClick) {
							await props.onClick()
							PressSound(2)
						} else if (props.url) {
							if (props.url.startsWith("/")) {
								location.Push(props.url)
							} else {
								window.open(props.url, "_self")
							}
							PressSound(2)
						}
					}}
					url={props.url}
					style={{
						display: "block",
						flex: 1,
						...props.interactiveStyle,
					}}
					//  url={"AAAA"}
					onHover={(b) => setHovered(b)}
					onPressed={(b) => {
						if (props.disabled) {
							return
						}

						if (props.pressed !== undefined) {
							const target = interactiveContainer.current!
							const r = target.getBoundingClientRect()
							setXYInner([r.width / 2, r.height / 2])

							return
						}
						setPressed(b)
						if (b) {
							PressSound(1)
						}
					}}
					onUsingKeyboard={(b) => {
						setUsingKeyboard(b)
					}}
					onMove={(x, y, e, pointerState) => {
						if (!pointerState.pressed) {
							return
						}

						const r = e.getBoundingClientRect()
						setXYInner([x - r.left, y - r.top])

						if (props.noSkew) {
							return
						}

						const longest = Math.max(r.height, r.width)

						const xn = ((((x - r.left) / r.width) * 2 - 1) * 650) / longest
						const yn = ((((y - r.top) / r.height) * 2 - 1) * 650) / longest

						if (interactiveContainer.current) {
							if (pointerState.hover) {
								interactiveContainer.current.style.transform = "perspective(140px) rotateY(" + xn + "deg) rotateX(" + -yn + "deg)"
							} else {
								interactiveContainer.current.style.transform = "perspective(140px) rotateY(" + 0 + "deg) rotateX(" + -0 + "deg)"
							}
						}
					}}
				>
					<div
						style={{
							transition: "transform 50ms linear",

							// filter: keyboardFocused ? "brightness(1.25) contrast(1.5) hue-rotate(-8deg)" : undefined,
							...props.style,
						}}
						ref={(e) => {
							;(interactiveContainer.current as any) = e
							if (props.interactiveRef && e) {
								;(props.interactiveRef.current as any) = e
							}
						}}
					>
						{props.children}
					</div>
				</Interactive>

				{ClickCircle({
					ref: circleHighlight,
					position: "absolute",
					x: xyInner[1],
					y: xyInner[0],

					color: "radial-gradient(circle, " + theme.colors.primary + " 0%, rgba(255,255,255,0) 50%)",
				})}

				{ClickCircle({
					ref: circlePointer,
					position: "fixed",
					x: xyInner[1],
					y: xyInner[0],

					color: "grey",
				})}
			</div>
		</div>
	)
}

Showcase("clickable", () => {
	return (
		<Column>
			<Clickable onClick={() => 0}>test</Clickable>
			<Row itemPadding="none" style={{ background: "grey" }}>
				<Clickable onClick={() => 0}>
					<div style={{ background: "red", width: 64, height: 64 }}></div>
				</Clickable>
				<Clickable onClick={() => 0}>
					<div style={{ background: "blue", width: 64, height: 64 }}></div>
				</Clickable>
				<Clickable onClick={() => 0}>
					<div style={{ background: "green", width: 64, height: 64 }}></div>
				</Clickable>
			</Row>
		</Column>
	)
})
