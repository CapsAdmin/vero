import anime from "animejs"
import { CSSProperties, useEffect, useRef } from "react"
import { Keyframes } from "./css"

const animations = new Map<HTMLElement, Animation[]>()
const name2animation = new Map<string, Animation>()

window.addEventListener("animationend", (ev) => {
	const anim = name2animation.get(ev.animationName)
	if (!anim) {
		return
	}

	anim.onAnimationEnd(ev.target as HTMLElement)
})

interface AnimationProps {
	keyframes: { [key: string]: CSSProperties }
	duration: number
	iterationCount: number
	delay: number
	curve: string
	direction: "normal" | "reverse" | "alternate" | "alternate-reverse"
	fill: "none" | "forwards" | "backwards" | "both"
	state: "paused" | "running"
}
class Animation implements AnimationProps {
	public keyframes = {}
	public duration = 1
	public iterationCount = 1
	public delay = 0
	public curve = "linear"
	public direction = "normal" as const
	public fill = "none" as const
	public state = "running" as const

	private animationName = "none"
	private elements: Set<HTMLElement> = new Set()

	constructor(init?: Partial<AnimationProps>) {
		if (init) {
			for (const _key in init) {
				const key = _key as keyof AnimationProps

				;(this as any)[key] = init[key]
			}
		}
	}

	public addElement(e: HTMLElement) {
		this.elements.add(e)

		if (!animations.has(e)) {
			animations.set(e, [])
		}

		const anims = animations.get(e)!

		if (anims.indexOf(this) === -1) {
			anims.push(this)
		}
	}

	public play(e?: HTMLElement) {
		console.log("playing")

		const props: any = {}

		for (const element of this.elements.values()) {
			if (e && e !== element) {
				continue
			}

			const anims = animations.get(element)

			if (anims) {
				for (const anim of anims) {
					const style = anim.buildStyle() as any

					for (const key in style) {
						props[key] = props[key] || []
						props[key].push(style[key].toString())
					}
				}
			}

			for (const key in props) {
				;(element.style as any)[key] = props[key].join(",")
			}

			console.log(element, element.style)

			const old = element.style.animationName
			element.style.animationName = "none"
			setTimeout(() => {
				element.style.animationName = old
			}, 0)
		}
	}

	public onAnimationEnd(e: HTMLElement) {
		console.log("animation end!")
	}

	public buildStyle(): CSSProperties {
		name2animation.delete(this.animationName)

		const animationName = Keyframes(this.keyframes)
		const animationDuration = this.duration + "s"
		const animationDelay = this.delay + "s"

		this.animationName = animationName

		name2animation.set(animationName, this)

		return {
			animationName,
			animationDuration,
			animationDelay,
			animationIterationCount: this.iterationCount,
			animationTimingFunction: this.curve,
			animationDirection: this.direction,
			animationFillMode: this.fill,
			animationPlayState: this.state,
		}
	}
}

export function useAnimation<T extends HTMLElement>(animeParams: anime.AnimeParams) {
	const container = useRef<T>(null)

	useEffect(() => {
		let element = container.current
		if (!element) return

		anime({
			targets: element,
			...animeParams,
		}).complete = () => {
			element!.style.transform = ""
		}
		// we can't use animeParams as a dependency here
		// because it would cause the hook to change on every render
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return container
}
