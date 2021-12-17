import { AbsolutePositionCenter } from "@frontend/gui/components/absolute-position-center"
import { Interactive } from "@frontend/gui/components/interactive/interactive"
import { Column } from "@frontend/gui/components/layout/row-column"
import { Showcase } from "@frontend/gui/showcase"
import { ThemeColor, ThemeSizes, useTheme } from "@frontend/gui/theme"
import { BaseTheme, Icon } from "@frontend/gui/themes/base"
import { Text } from "@frontend/gui/typography"
import { location } from "@frontend/other/location"
import { PressSound } from "@frontend/other/sounds"
import anime, { AnimeParams } from "animejs"
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from "react"

const buildFilter = (props: { theme: BaseTheme; pressed: boolean; hovered: boolean; disabled: boolean }) => {
	const gray = props.disabled ? " grayscale(" + (props.disabled ? 1 : 0) + ")" : ""

	if (props.hovered) {
		return "brightness(" + props.theme.buttonStyle.hoverBrightness + ")" + gray
	}

	if (props.pressed) {
		return "brightness(" + props.theme.buttonStyle.pressBrightness + ")" + gray
	}

	return "brightness(1)"
}
export const Button = (props: {
	className?: string
	onClick?: () => void
	style?: CSSProperties
	children?: ReactNode
	selected?: boolean
	disabled?: boolean
	pressed?: boolean
	textColor?: string
	backgroundColor?: ThemeColor
	buttonStyle?: CSSProperties
	focus?: boolean
	weak?: boolean
	fit?: boolean
	circle?: boolean
	busy?: boolean
	autoFocus?: boolean
	url?: string
	type?: "button" | "submit" | "reset"
	width?: ThemeSizes
}) => {
	const [pressed, setPressed] = useState(props.pressed || false)
	const [hovered, setHovered] = useState(false)
	const [usingKeyboard, setUsingKeyboard] = useState(false)

	const [xyInner, setXYInner] = useState([0, 0])
	const [busy, setBusy] = useState(false)

	const circlePointer = useRef<HTMLDivElement>(null)
	const circleHighlight = useRef<HTMLDivElement>(null)
	const grayscaleRef = useRef<HTMLDivElement>(null)

	const container = useRef<HTMLDivElement>(null)
	const interactiveContainer = useRef<HTMLDivElement>(null)
	const theme = useTheme()

	const distance = theme.buttonStyle.zDistance
	const dirX = 1 * distance
	const dirY = 1 * distance
	const shadowColor = "rgba(0,0,0,0.25  )"

	const disabled = props.disabled || busy

	useEffect(() => {
		const b = props.pressed !== undefined ? props.pressed : disabled ? true : pressed

		{
			const anim: AnimeParams = {
				targets: props.weak ? grayscaleRef.current : container.current,
			}

			if (b) {
				if (props.weak) {
					anim.boxShadow = shadowColor + " " + dirX + "px " + dirY + "px 0px 0px inset"
				} else {
					anim.boxShadow = shadowColor + " 0px 0px 0px 0px"
					anim.translateX = dirX
					anim.translateY = dirY
					anim.translateZ = 1 // fools firefox to use subpixel rendering
					anim.transformOrigin = "50% 50%"

					if (container.current) {
						let rect = container.current.getBoundingClientRect()
						anim.rotate = ((xyInner[0] / rect.width) * 2 - 1) * 0.25
					}
				}

				anim.easing = "spring(0, 100, 150, 25)"

				anim.filter = buildFilter({
					theme,
					pressed: true,
					hovered,
					disabled,
				})
			} else {
				anim.translateX = 0
				anim.translateY = 0
				anim.translateZ = 0
				anim.rotate = 0
				if (props.weak) {
					anim.boxShadow = shadowColor + " 0px 0px 0px 0px"
				} else {
					anim.boxShadow = shadowColor + " " + dirX + "px " + dirY + "px 0px 0px"
				}

				anim.easing = "spring(0.25, 100, 105, 130)"
				anim.filter = buildFilter({
					theme,
					pressed: false,
					hovered,
					disabled,
				})

				if (!hovered || props.pressed === false) {
					anim.duration = 250
					anim.easing = "linear"
				}
			}

			anime.remove(anim.targets!)
			anime(anim)
		}

		if (!disabled) {
			if (b) {
				PressSound(1)
			}
		}
	}, [pressed, props.pressed, disabled, props.weak, hovered, dirX, dirY, xyInner, theme])

	const pointerPressed = (b: boolean) => {
		const anim: AnimeParams = {
			duration: 250,
			targets: circlePointer.current!,
		}

		if (b) {
			if (usingKeyboard) {
				anim.scale = 3
			} else {
				anim.scale = 0.5
			}
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

		if (theme.buttonStyle.noLight) {
			return
		}

		anim.targets = circleHighlight.current!

		if (!container.current) return

		if (b) {
			const rect = container.current ? container.current.getBoundingClientRect() : { width: 1, height: 1 }
			const size = Math.max(rect.width, rect.height) * 2.2
			anim.scale = size / 100
			anim.duration = 200
			anim.opacity = 1
		} else {
			anim.opacity = 0
		}

		anime.remove(anim.targets!)
		anime(anim)
	}

	let timers: any[] = []

	return (
		<div
			className={props.className}
			data-testid="button"
			ref={container}
			style={{
				borderRadius: theme.borderSizes.small,
				filter: buildFilter({
					theme,
					pressed: false,
					hovered,
					disabled,
				}),
				boxShadow: !props.weak ? shadowColor + " " + dirX + "px " + dirY + "px 0px 0px" : undefined,
				// transition: "box-shadow 1000ms linear"
			}}
		>
			<div
				ref={(e) => {
					;(grayscaleRef as any).current = e
					for (let timer of timers) {
						clearTimeout(timer)
					}
				}}
				style={{
					display: "block",

					borderRadius: theme.borderSizes.small,

					overflow: "hidden",
					position: "relative",

					WebkitMaskImage: "-webkit-radial-gradient(white, black)",
					// -webkit-mask-image: -webkit-radial-gradient(white, black)
					margin: usingKeyboard ? -theme.strokeWidthThick : 0,

					// background: keyboardFocused ? "rgba(0,0,0,0.1)" : "transparent",
					// borderRadius: "2px",
				}}
			>
				<Interactive
					autoFocus={props.autoFocus}
					url={props.url}
					onInteracted={async (pointerState) => {
						if (disabled) {
							return
						}

						let hmm = false

						let id = setTimeout(() => {
							if (!hmm) {
								setBusy(true)
								pointerPressed(false)
								anime({
									targets: container.current!,
									filter: buildFilter({
										theme,
										pressed: false,
										hovered,
										disabled: true,
									}),
									duration: 500,
								})
							}
						}, 100)

						timers.push(id)

						if (props.onClick) {
							if (pointerState.hover) {
								PressSound(2)
							}

							try {
								await props.onClick()
							} catch (err) {
								console.error(err)
							}
						} else if (props.url) {
							if (props.url.startsWith("/")) {
								location.Push(props.url)
							} else {
								window.open(props.url, "_self")
							}
							PressSound(2)
						}

						hmm = true

						setBusy(false)
						setPressed(false)

						anime({
							targets: container.current!,
							filter: buildFilter({
								theme,
								pressed: false,
								hovered,
								disabled: false,
							}),
							duration: 500,
						})
					}}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",

						transition: "transform 50ms linear",

						borderRadius: theme.borderSizes.small,
						border: usingKeyboard ? theme.strokeWidthThick + "px solid " + theme.colors.primary : undefined,
						// filter: keyboardFocused ? "brightness(1.25) contrast(1.5) hue-rotate(-8deg)" : undefined,
						...props.style,
					}}
					refContainer={interactiveContainer}
					//  url={"AAAA"}
					onHover={(b) => {
						if (disabled) {
							return
						}
						setHovered(b)
					}}
					onPressed={(b) => {
						if (disabled) {
							return
						}

						pointerPressed(b)

						if (props.pressed !== undefined) {
							return
						}

						setPressed(b)
					}}
					onUsingKeyboard={(b) => setUsingKeyboard(b)}
					onMove={(x, y, e, pointerState) => {
						if (!pointerState.pressed) {
							return
						}

						const r = e.getBoundingClientRect()
						setXYInner([x - r.left, y - r.top])
					}}
				>
					{busy || props.busy ? (
						<AbsolutePositionCenter>
							<Icon type="Loading" size="IconSmall" />
						</AbsolutePositionCenter>
					) : null}
					<div style={{ flex: 1, opacity: busy || props.busy ? 0.05 : undefined }}>
						{
							<theme.buttonStyle.Contents weak={props.weak} style={props.buttonStyle} color={props.backgroundColor} pressed={pressed} hover={hovered}>
								<Text
									strong={!props.weak}
									color={props.weak ? "textForeground" : "textButton"}
									style={{
										whiteSpace: "nowrap",
									}}
								>
									{props.children}
								</Text>
							</theme.buttonStyle.Contents>
						}
					</div>
				</Interactive>
			</div>
		</div>
	)
}

Showcase("button", () => {
	return (
		<Column>
			<Button onClick={() => 0}>normal</Button>
			<Button
				weak
				onClick={() => {
					;(() => 0)()
				}}
			>
				weak
			</Button>
			<div style={{ outline: "1px solid black" }}>
				<Button>test</Button>
			</div>
			<Button
				onClick={async () => {
					await new Promise<void>((resolve) => {
						setTimeout(() => {
							resolve()
						}, 2000)
					})
				}}
			>
				{"loading"}
			</Button>
		</Column>
	)
})
