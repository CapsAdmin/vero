import { onRender, removeOnRender } from "@frontend/other/render-loop"
import { useEffect, useState } from "react"
import { Clamp, Lerp } from "../../other/other"

export const AnimatedNumber = (props: { number: number; renderResults: (value: number, progress: number) => JSX.Element; duration: number }) => {
	const [progress, setProgress] = useState(0)
	const [current, setCurrent] = useState(props.number)

	useEffect(() => {
		const from = current
		const to = props.number

		let f = 0

		const sec = props.duration / 1000

		const id = onRender((dt) => {
			f += dt

			const p = Clamp(f / sec, 0, 1)

			setProgress(p)
			setCurrent(Lerp(p, from, to))

			return f / sec <= 1
		})

		return () => {
			removeOnRender(id)
		}
	}, [current, props.duration, props.number])

	let hack = progress

	if (progress === 1 && props.number !== current) {
		hack = 0
	}

	return props.renderResults(current, hack)
}
