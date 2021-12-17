import { RandomRange } from "./other"

type RenderCallback = (deltaTime: number, progress?: number) => boolean

let isRendering = false
const renderCallbackSet = new Set()
const renderCallbacks: Array<(dt: number) => boolean> = []
const preRenderCallbacks: Array<(dt: number) => boolean> = []

const render: RenderCallback = (dt) => {
	for (let i = preRenderCallbacks.length - 1; i >= 0; i--) {
		const callback = preRenderCallbacks[i]

		if (callback(dt) === false) {
			preRenderCallbacks.splice(i, 1)
			//console.log("removing pre render callback ", i, " - ", renderCallbacks.length)
		}
	}

	for (let i = renderCallbacks.length - 1; i >= 0; i--) {
		const callback = renderCallbacks[i]

		if (callback(dt) === false) {
			renderCallbacks.splice(i, 1)
			renderCallbackSet.delete(callback)
			//console.log("removing render callback ", i, " - ", renderCallbacks.length)
		}
	}

	return renderCallbacks.length !== 0 && preRenderCallbacks.length !== 0
}

const beginLoop = () => {
	if (isRendering) {
		//console.log("not starting rendering, already started")
		return
	}

	let lastTime = 0

	//console.log("main render loop started")

	function loop(time: number) {
		let dt = time - (lastTime || time)
		dt /= 1000

		if (render(dt) === false) {
			//console.log("main render loop finished")
			isRendering = false
			return
		}

		lastTime = time

		requestAnimationFrame(loop)
	}

	isRendering = true

	requestAnimationFrame(loop)
}

export const onRender = (cb: (dt: number) => boolean) => {
	if (renderCallbackSet.has(cb)) {
		return
	}
	renderCallbacks.push(cb)
	renderCallbackSet.add(cb)
	//console.log("adding render callback", renderCallbacks.length)
	beginLoop()
}

export const removeOnRender = (id: any) => {
	if (renderCallbackSet.delete(id)) {
		renderCallbacks.splice(renderCallbacks.indexOf(id), 1)
	}
}

export const onPreRender = (cb: (dt: number) => boolean) => {
	preRenderCallbacks.push(cb)
	//console.log("adding pre render callback", preRenderCallbacks.length)
	beginLoop()
}

let context: CanvasRenderingContext2D
export const getCanvasOverlay = () => {
	if (!context) {
		const canvas = document.createElement("canvas")
		canvas.id = "canvas-overlay"
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		window.addEventListener("resize", () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		})

		canvas.style.pointerEvents = "none"
		canvas.style.position = "fixed"
		canvas.style.zIndex = "9999"
		document.body.insertBefore(canvas, document.getElementById("root"))

		context = canvas.getContext("2d")!
	}

	return context
}

const gfx = getCanvasOverlay()

export const starField = (duration: number, element: HTMLElement) => {
	const points: Array<{ x: number; y: number; thickness: number }> = []

	const pow = () => {
		return Math.pow(Math.sin(Math.random() * Math.PI) * 0.5 + 0.5, 7)
	}

	for (let i = 0; i < 50; i++) {
		const scale = 2

		const x = pow() * window.innerWidth * scale - window.innerWidth / scale
		const y = pow() * window.innerHeight * scale - window.innerHeight / scale
		const thickness = RandomRange(5, 15)

		points.push({
			x,
			y,
			thickness,
		})
	}

	const starImage = document.createElement("img")
	starImage.src = "https://tr.rbxcdn.com/c9e1248514014b4cbe2b631910f030db/420/420/Decal/Png"

	let f = 0
	const sec = duration / 1000

	onRender((dt) => {
		const progress = f / sec

		for (const point of points) {
			const box = element.getBoundingClientRect()
			const centerX = box.left + box.width / 2
			const centerY = box.top + box.height / 2
			const dirX = centerX - point.x
			const dirY = centerY - point.y
			const dist = Math.sqrt(dirX * dirX + dirY * dirY)
			const dir = -Math.atan2(dirX, dirY)

			const t = ((f * 1000) % dist) - box.width

			gfx.translate(point.x, point.y)
			gfx.rotate(dir)
			gfx.globalAlpha = Math.sin((t / dist) * Math.PI) * Math.sin((-progress + 1) * Math.PI)
			gfx.drawImage(starImage, 0, t, point.thickness, (-t + dist) / 3)
			gfx.resetTransform()
		}
		f += dt

		return progress <= 1
	})
}
