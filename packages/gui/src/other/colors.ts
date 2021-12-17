import { chroma } from "@frontend/app/thirdparty"
import { Lerp, pairs } from "./other"

const primaryColors = ["red", "green", "blue"]

const tertiaryColors = ["yellow", "purple", "brown", ...primaryColors] as const

type TertiaryColor = typeof tertiaryColors[number]

const knownColors = [
	"black",
	"darkest",
	"darker",
	"dark",
	"grey",
	"light",
	"lighter",
	"lightest",
	"white",
	"red-black",
	"red-darkest",
	"red-darker",
	"red-dark",
	"red",
	"red-light",
	"red-lighter",
	"red-lightest",
	"red-white",
	"orange-black",
	"orange-darkest",
	"orange-darker",
	"orange-dark",
	"orange",
	"orange-light",
	"orange-lighter",
	"orange-lightest",
	"orange-white",
	"brown-black",
	"brown-darkest",
	"brown-darker",
	"brown-dark",
	"brown",
	"brown-light",
	"brown-lighter",
	"brown-lightest",
	"brown-white",
	"yellow-black",
	"yellow-darkest",
	"yellow-darker",
	"yellow-dark",
	"yellow",
	"yellow-light",
	"yellow-lighter",
	"yellow-lightest",
	"yellow-white",
	"green-black",
	"green-darkest",
	"green-darker",
	"green-dark",
	"green",
	"green-light",
	"green-lighter",
	"green-lightest",
	"green-white",
	"blue-black",
	"blue-darkest",
	"blue-darker",
	"blue-dark",
	"blue",
	"blue-light",
	"blue-lighter",
	"blue-lightest",
	"blue-white",
	"purple-black",
	"purple-darkest",
	"purple-darker",
	"purple-dark",
	"purple",
	"purple-light",
	"purple",
	"purple-lightest",
	"purple-white",
] as const

type ColorNames = typeof knownColors[number]

class Colors {
	ModifyAlpha(color: string, alpha: number) {
		return chroma(color).alpha(alpha).hex()
	}

	Mix(a: string, b: string, m: number): string {
		if (a && a.startsWith("linear-gradient")) {
			const match = a.match(/(.*[(].*,)(.*),(.*)[)]/m)
			const x = this.Mix(match![2].trim(), b, m)
			const y = this.Mix(match![3].trim(), b, m)

			return match![1] + x + "," + y + ")"
		}

		if (b && b.startsWith("linear-gradient")) {
			const match = b.match(/(.*[(].*,)(.*),(.*)[)]/m)
			const x = this.Mix(a, match![2].trim(), m)
			const y = this.Mix(a, match![3].trim(), m)

			return match![1] + x + "," + y + ")"
		}

		return chroma
			.scale([chroma(a), chroma(b)])(m)
			.hex()
	}

	Add(a: string, b: string): string {
		return chroma.blend(chroma(a), chroma(b), "screen").hex()
	}

	Subtract(a: string, b: string): string {
		return chroma.blend(chroma(a), chroma(b), "multiply").hex()
	}

	BuildPallete(shades: string[], colors: { [key in TertiaryColor]: string }, config?: { saturation?: number }) {
		const pallete = { ...colors } as { [key in ColorNames]: string }

		const genShade = chroma.scale([...shades].reverse())

		for (const [i, shadeName] of ["black", "darkest", "darker", "dark"].entries()) {
			for (const [colorName, color] of pairs(colors)) {
				pallete[(colorName + "-" + shadeName) as ColorNames] = chroma.mix(chroma(color).darken((-i + 4) / 1.25), genShade(Lerp(i / 4, 0.5, 0)), 0).hex()
			}
		}

		for (const [i, shadeName] of ["light", "lighter", "lightest", "white"].entries()) {
			for (const [colorName, color] of pairs(colors)) {
				pallete[(colorName + "-" + shadeName) as ColorNames] = chroma
					.mix(
						chroma(color)
							.brighten(i / 1.25)
							.desaturate(i / 0.75),
						genShade(Lerp(i / 4, 1, 0.5)),
						0,
					)
					.hex()
			}
		}

		for (const [i, shadeName] of ["black", "darkest", "darker", "dark", "grey", "light", "lighter", "lightest", "white"].entries()) {
			pallete[shadeName as ColorNames] = genShade(i / 8).hex()
		}

		return pallete
	}

	FindContrast(foreground: string, background: string, backgroundFallback: string) {
		let bg = chroma(background)
		const alpha = bg.alpha()
		if (alpha < 1) {
			bg.alpha(1)
			bg = bg.mix(backgroundFallback, -alpha + 1)
		}

		return chroma.contrast(foreground, bg)
	}

	GetAlpha(color: string) {
		return chroma(color).alpha()
	}

	IsValid(color: string) {
		return chroma.valid(color)
	}

	LinearToSRGB(c: number) {
		if (c <= 0.0031308) {
			return 12.92 * c
		} else {
			return 1.055 * Math.pow(c, 1 / 2.4) - 0.055
		}
	}

	FeColorMatrixFromCSSColor(color = "white") {
		let [r, g, b] = chroma(color || "white").rgb()

		r = this.LinearToSRGB(r / 255) * 255
		g = this.LinearToSRGB(g / 255) * 255
		b = this.LinearToSRGB(b / 255) * 255

		return [`${r / 255} 0 0 0 0`, `0 ${g / 255} 0 0 0`, `0 0 ${b / 255} 0 0`, `0 0 0 1 0`].join("\n")
	}
}

export const color_util = new Colors()
