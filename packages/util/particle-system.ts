import { Clamp } from "./other"
import { getCanvasOverlay, onPreRender, onRender } from "./render-loop"

const gfx = getCanvasOverlay()!

onPreRender((dt) => {
	gfx.clearRect(0, 0, window.innerWidth, window.innerHeight)
	return true
})

export interface Particle {
	x: number
	y: number
	xvel: number
	yvel: number
	drag: number
	lifeTime?: number
	createdTime: number

	velocity: number
	angleVelocity: number
	progress: number
	element?: HTMLElement

	userdata: any
}

export const createEmitter = (renderParticle?: (particle: Particle, gfx: CanvasRenderingContext2D, deltaTime: number) => void) => {
	renderParticle =
		renderParticle ||
		((particle, gfx) => {
			gfx.fillStyle = "red"
			gfx.globalAlpha = Math.pow(-particle.progress + 1, 0.5)
			gfx.rotate(particle.angleVelocity)
			gfx.fillRect(0, 0, particle.velocity * 10, 2)
		})

	const particles: Particle[] = []

	const render = (deltaTime: number) => {
		const time = Date.now()

		for (let i = particles.length - 1; i >= 0; i--) {
			const p = particles[i]

			p.xvel = p.xvel * p.drag
			p.yvel = p.yvel * p.drag

			p.x = p.x + p.xvel
			p.y = p.y + p.yvel

			p.angleVelocity = Math.atan2(p.yvel, p.xvel)
			p.velocity = Math.sqrt(p.xvel * p.xvel + p.yvel * p.yvel)
			if (p.lifeTime) {
				p.progress = Clamp((time - p.createdTime) / p.lifeTime, 0, 1)
			}

			if (p.element) {
				const box = p.element.getBoundingClientRect()
				gfx.translate(p.x + box.left, p.y + box.top)
			} else {
				gfx.translate(p.x, p.y)
			}

			renderParticle!(p, gfx, deltaTime)
			gfx.resetTransform()

			if (p.element) {
			} else {
				if (p.x <= 0 || p.x >= window.innerWidth) {
					p.xvel = -p.xvel
				}

				if (p.y <= 0 || p.y >= window.innerHeight) {
					p.yvel = -p.yvel
				}
			}

			if (p.progress >= 1) {
				particles.splice(i, 1)
			}
		}

		if (particles.length === 0) {
			return false
		}

		return true
	}

	return {
		particles,
		createParticle: (config: { x: number; y: number; lifeTime?: number; xvel?: number; yvel?: number; element?: HTMLElement; drag?: number; userdata?: any }) => {
			const particle = config as Particle
			particle.createdTime = Date.now()
			particle.xvel = particle.xvel || 0
			particle.yvel = particle.yvel || 0
			particle.drag = particle.drag || 0.995
			particle.progress = 0
			particles.push(particle)

			onRender(render)

			return particle
		},
	}
}
