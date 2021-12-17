import anime from "animejs"
import { onRender } from "@frontend/other/render-loop"
import { Clamp } from "@frontend/other/other"

const noise = () => Math.random() * 2 - 1

let scale = 1
let originX = 0
let originY = 0
const update = (e: HTMLDivElement, _x: number, _y: number, _scale: number, _originX: number, _originY: number) => {
	e.style.transformOrigin = `${_originX}px ${_originY}px`
	e.style.transform = `translateX(${_x}px) translateY(${_y}px) scale3d(${_scale}, ${_scale}, 1)`

	scale = _scale
	originX = _originX
	originY = _originY
}

export const ScreenShake = (duration: number, intensity: number, frequency: number) => {
	const bg = document.getElementById("background") as HTMLDivElement

	const time = Date.now() + duration

	let smoothX = 0
	let smoothY = 0

	onRender(() => {
		const f = Clamp(time - Date.now(), 0, 1000) / 1000

		const x = smoothX * intensity * Math.pow(f, 1.5)
		const y = smoothY * intensity * Math.pow(f, 1.5)

		update(bg, x, y, scale, originX, originY)

		smoothX = smoothX + (noise() - smoothX) * frequency
		smoothY = smoothY + (noise() - smoothY) * frequency

		if (f <= 0) {
			update(bg, 0, 0, scale, 0, 0)
			// bg.style.transform = ""

			return false
		}

		return true
	})
}

window.anime = anime
