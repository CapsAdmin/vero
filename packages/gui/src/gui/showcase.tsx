import { ReactElement } from "react"

export type ShowcaseType = {
	render: () => ReactElement
	title: string
	category: string
}

const showcases: Array<ShowcaseType> = []

export const Showcase = (title: string, render: () => ReactElement, category?: string) => {
	let match = new Error().stack?.split("\n")[1].match(/.+\/(.*)\/(.*)\.ts/)

	title = title || (match && match[2]) || "?"
	category = category || (match && match[1]) || "?"

	showcases.push({
		title,
		render,
		category,
	})
}

export const GetShowcases = () => {
	require("./showcase/ff7")
	require("./showcase/typography")
	require("./showcase/visual-feedback")
	require("./components/selector")

	return showcases
}
