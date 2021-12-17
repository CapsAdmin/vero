import { Column } from "@frontend/gui/components/layout/row-column"
import { Showcase } from "@frontend/gui/showcase"
import { Text } from "@frontend/gui/typography"
import React, { CSSProperties, ReactNode, RefObject, useRef, useState } from "react"

const pointDistance2D = (x1: number, y1: number, x2: number, y2: number) => {
	const dx = x1 - x2
	const dy = y1 - y2
	return Math.sqrt(dx * dx + dy * dy)
}

interface PointerState {
	pressed: boolean
	hover: boolean
	usingKeyboard: boolean
}

export const Interactive = (props: {
	children?: ReactNode
	autoFocus?: boolean
	description?: string
	buttonType?: string

	style?: CSSProperties

	onPressed?: (b: boolean, pointerState: PointerState) => void
	onHover?: (b: boolean, pointerState: PointerState) => void
	onUsingKeyboard?: (b: boolean, pointerState: PointerState) => void
	onMove?: (x: number, y: number, element: HTMLElement, pointerState: PointerState) => void

	refContainer?: RefObject<HTMLElement> | ((e: HTMLElement | null) => void)
	url?: string

	onInteracted?: (pointerState: PointerState) => void
}) => {
	const pointerState = useRef<
		PointerState & {
			mousePressed: boolean
			pressX: number
			pressY: number
			focused: boolean
		}
	>({
		pressed: false,
		hover: false,
		usingKeyboard: false,

		mousePressed: false,
		pressX: 0,
		pressY: 0,
		focused: false,
	})

	const setPressed = (b: boolean) => {
		const prev = pointerState.current.pressed
		pointerState.current.pressed = b

		if (props.onPressed) {
			if (b !== prev) {
				props.onPressed(b, pointerState.current)
			}
		}
	}

	const setHover = (b: boolean) => {
		const prev = pointerState.current.hover

		if (b === prev) return

		pointerState.current.hover = b

		if (props.onHover) {
			if (b !== prev) {
				props.onHover(b, pointerState.current)
			}
		}
	}
	const setUsingKeyboard = (b: boolean) => {
		const prev = pointerState.current.usingKeyboard

		pointerState.current.usingKeyboard = b

		if (props.onUsingKeyboard) {
			if (b !== prev) {
				props.onUsingKeyboard(b, pointerState.current)
			}
		}
	}

	const interact = async (how: "pointer" | "keyboard") => {
		if (how === "pointer" ? pointerState.current.hover : how === "keyboard" ? pointerState.current.usingKeyboard : false) {
			if (props.onInteracted) {
				await props.onInteracted(pointerState.current)
			}
		}
	}

	let tag = "a"

	if (!props.url) {
		tag = "div"
	}

	let addedEvents = new Map<string, any>()

	return React.createElement(
		tag,
		{
			href: props.url,
			"aria-label": props.description,
			// disable dragging the url
			draggable: false,
			onDragStart: (e) => {
				e.preventDefault()
				e.stopPropagation()
				return false
			},
			onClick: (e) => {
				e.preventDefault()
				e.stopPropagation()
				return false
			},
			ref: (e: HTMLAnchorElement) => {
				if (e && props.autoFocus && !pointerState.current.focused) {
					pointerState.current.mousePressed = true
					e.focus()
					pointerState.current.focused = true
				}
				if (props.refContainer) {
					if (typeof props.refContainer === "function") {
						props.refContainer(e)
					} else {
						;(props.refContainer as any).current = e
					}
				}
				if (e) {
					e.onclick = (el) => el.preventDefault()
				}
			},
			tabIndex: 0,
			onBlur: (e) => {
				setUsingKeyboard(false)
				for (const [key, value] of addedEvents) {
					window.removeEventListener(key, value)
				}
				addedEvents.clear()
			},
			onFocus: (e) => {
				if (pointerState.current.mousePressed) {
					setUsingKeyboard(false)
					pointerState.current.mousePressed = false
					return
				}
				//setUsingKeyboard(true)
				/*
				e.currentTarget.scrollIntoView({
					block: "center",
					inline: "center",
					behavior: "smooth",
				})*/
			},
			onKeyDown: (e) => {
				if (pointerState.current.pressed) {
					return
				}

				if (e.key === "Tab" || e.key === "Enter" || e.key === " ") {
					setUsingKeyboard(true)
				}
				if (e.key === "Enter" || e.key === " ") {
					const target = e.currentTarget
					let cb: (ev: KeyboardEvent) => void
					cb = async (e) => {
						if (e.key === "Enter" || e.key === " ") {
							if (target === document.activeElement) {
								setHover(true)
								if (props.onMove) {
									const r = target.getBoundingClientRect()
									props.onMove(r.left + r.width / 2, r.top + r.height / 2, target, pointerState.current)
								}
								await interact("keyboard")
							} else {
								setHover(false)
							}
							setPressed(false)

							window.removeEventListener("keyup", cb)
						}
					}
					window.addEventListener("keyup", cb)
					setHover(true)
					setPressed(true)
					if (props.onMove) {
						const r = target.getBoundingClientRect()
						props.onMove(r.left + r.width / 2, r.top + r.height / 2, target, pointerState.current)
					}
				}
			},
			onPointerMove: (ev) => {
				if (props.onMove) {
					props.onMove(ev.clientX, ev.clientY, ev.currentTarget, pointerState.current)
				}
			},
			onPointerDown: (e) => {
				pointerState.current.mousePressed = true

				setUsingKeyboard(false)

				if (e.pointerType === "mouse" && e.button !== 0) {
					return
				}

				const target = e.currentTarget

				// target.focus()

				pointerState.current.pressX = e.clientX
				pointerState.current.pressY = e.clientY

				// global pointer move event listener
				let pointermove: (ev: PointerEvent) => void = (ev) => {
					if (document.elementsFromPoint(ev.x, ev.y).indexOf(target) === -1) {
						if (pointDistance2D(pointerState.current.pressX, pointerState.current.pressY, ev.x, ev.y) > 10) {
							setHover(false)
						}
					} else {
						setHover(true)
					}

					if (props.onMove) {
						props.onMove(ev.clientX, ev.clientY, target, pointerState.current)
					}
				}
				window.addEventListener("pointermove", pointermove)
				addedEvents.set("pointermove", pointermove)

				setHover(true)
				setPressed(true)

				const id = e.pointerId

				let pointercancel: (e: PointerEvent) => void = (e) => {
					if (addedEvents.size === 0) return
					if (e.pointerId !== id) {
						return
					}
					setHover(false)
					setPressed(false)

					window.removeEventListener("pointerup", pointerup)
					window.removeEventListener("pointermove", pointermove)
					window.removeEventListener("pointercancel", pointercancel)
				}
				window.addEventListener("pointercancel", pointercancel)
				addedEvents.set("pointercancel", pointercancel)

				let pointerup: (ev: PointerEvent) => void = async (e) => {
					if (addedEvents.size === 0) return
					await interact("pointer")
					setPressed(false)

					window.removeEventListener("pointerup", pointerup)
					window.removeEventListener("pointermove", pointermove)
					window.removeEventListener("pointercancel", pointercancel)
				}
				window.addEventListener("pointerup", pointerup)
				addedEvents.set("pointerup", pointerup)

				if (props.onMove) {
					props.onMove(e.clientX, e.clientY, target, pointerState.current)
				}
			},
			onPointerLeave: (e) => {
				// the pointer leaves as soon as you release when the pointer type is not mouse
				// in the press event we want to know if the pointer left so we can do a different
				// type of animation

				if (pointDistance2D(pointerState.current.pressX, pointerState.current.pressY, e.clientX, e.clientY) > 10) {
					if (e.pointerType !== "mouse") {
						setTimeout(() => {
							setHover(false)
						}, 0)
					} else {
						setHover(false)
					}
				}
			},
			style: {
				touchAction: "pan-y",
				perspectiveOrigin: "center",
				textDecoration: "none",
				WebkitUserSelect: "none",
				outline: "none",
				cursor: "pointer",
				...props.style,
			},
		},
		props.children,
	)
}

export const InteractiveDebug = () => {
	const state = useRef({
		interacted: 0,
		hover: false,
		pressed: false,
		keyboardFocus: false,
	})

	const [xy, setXY] = useState([0, 0])

	const [, _render] = useState(0)
	const render = () => _render(Math.random())

	return (
		<Interactive
			onPressed={(b) => {
				state.current.pressed = b
				render()
			}}
			onInteracted={() => {
				state.current.interacted++
				render()

				setTimeout(() => {
					state.current.interacted--
					render()
				}, 1000)
			}}
			onHover={(b) => {
				state.current.hover = b
				render()
			}}
			onUsingKeyboard={(b) => {
				state.current.keyboardFocus = b
				render()
			}}
			onMove={(x, y) => {
				setXY([x, y])
			}}
		>
			<Text>{JSON.stringify(state.current, null, 2)}</Text>
			<div
				style={{
					position: "absolute",
					top: xy[1],
					left: xy[0],
					width: 10,
					height: 10,
					background: "red",
				}}
			></div>
		</Interactive>
	)
}

Showcase("interactive", () => {
	return (
		<Column>
			<InteractiveDebug></InteractiveDebug>
		</Column>
	)
})
