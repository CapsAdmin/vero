export function Lerp(t: number, v0: number, v1: number) {
	return v0 * (1 - t) + v1 * t
}

export const Hash = (str: string) => {
	let hash = 0

	for (let i = 0; i < str.length; i++) {
		let chr = str.charCodeAt(i)
		hash = (hash << 5) - hash + chr
		hash |= 0
	}
	return hash
}

export function Clamp(val: number, min: number, max: number) {
	return Math.max(min, Math.min(max, val))
}

export const parseQueryString = (str: string) => {
	const out: { [key: string]: string } = {}
	str.split("&").map((pair) => {
		const lr = pair.split("=")
		return (out[lr[0]] = lr[1])
	})
	return out
}

export const CopyToClipboard = (str: string) => {
	const el = document.createElement("textarea")
	el.value = str
	document.body.appendChild(el)
	el.select()
	document.execCommand("copy")
	document.body.removeChild(el)
}

export const PRODUCTION = process.env.NODE_ENV === "production"
export const DEBUG = !PRODUCTION || window.location.host === "motivero.qa.posten.cloud" || window.location.host === "localhost:3002"
export const TESTING = process.env.JEST_WORKER_ID !== undefined
export const RandomSeed = (seed: number) => {
	const x = Math.sin(seed) * 10000
	return x - Math.floor(x)
}

export const RandomRange = (min: number, max: number) => {
	return Lerp(Math.random(), min, max)
}
export const pairs = Object.entries as <T>(o: T) => Array<[Extract<keyof T, string>, T[keyof T]]>

export const Lowercase = <T extends string>(str: T) => {
	return str.toLowerCase() as Lowercase<T>
}

export const Capitalize = <T extends string>(str: T) => {
	return (str.charAt(0).toUpperCase() + str.substr(1)) as Capitalize<T>
}
