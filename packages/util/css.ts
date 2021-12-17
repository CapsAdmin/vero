import { CSSProperties } from "react"
const CRC32 = require("crc-32")

const done = new Set<string>()

export const InjectCSS = (css: string) => {
	if (done.has(css)) {
		return
	}

	done.add(css)

	const prev = document.getElementById(css)
	if (prev && prev.parentElement) {
		prev.parentElement.removeChild(prev)
	}

	const e = document.createElement("style")
	e.type = "text/css"
	e.appendChild(document.createTextNode(css))
	e.id = css

	document.getElementsByTagName("head")[0].appendChild(e)
}

export const Keyframes = (frames: { [key: string]: CSSProperties }) => {
	let body = ""
	for (const key in frames) {
		body += key + "% {" + ReactStyleToCSS(frames[key]) + "}\n"
	}

	const animationName = "react_keyframes_" + CRC32.str(body)
	const css = "@keyframes " + animationName + " {\n" + body + "}"

	InjectCSS(css)

	return animationName
}

const ReactStyleToCSS = (style: CSSProperties) => {
	let css = ""

	Object.entries(style).forEach(([key, value]) => {
		if (!value) {
			return
		}
		let strValue = value.toString()
		if (typeof value === "number") {
			strValue += "px"
		}
		css += key.replace(/([a-z])([A-Z])/, "$1-$2") + ": " + strValue + ";\n"
	})

	return css
}
