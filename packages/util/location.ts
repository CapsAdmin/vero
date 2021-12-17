import { useEffect, useState } from "react"

const parseQueryString = (str: string) => {
	const out: { [key: string]: string } = {}
	str.split("&").map((pair) => {
		const lr = pair.split("=")
		return (out[lr[0]] = lr[1])
	})
	return out
}
class LocationManager {
	constructor() {
		window.addEventListener("popstate", () => this.Notify())
	}
	public Push(url: string) {
		if (window.location.pathname === url) {
			console.log("avoiding pushState when url is the same as previous, " + url)
			return
		}

		console.log("location: push", url)

		window.history.pushState({ previousPage: window.location.pathname }, "", url)
		this.Notify()
	}
	public Pop() {
		console.log("location: pop")
		window.history.back()
	}
	public Replace(url: string) {
		window.history.replaceState(null, "", url)
		this.Notify()
	}

	public use() {
		/* eslint-disable react-hooks/rules-of-hooks */
		const [, render] = useState({})

		const pathName = window.location.pathname !== "/" ? window.location.pathname.slice(1) : "index"
		const previousPathName = window.history.state && window.history.state.previousPage ? (window.history.state.previousPage as string) : ""
		const search = parseQueryString(window.location.search.slice(1))

		const previousName = previousPathName.split("/").pop() || ""
		const currentName = pathName.split("/").pop() || ""

		const title = currentName
		const previousTitle = previousName

		useEffect(() => {
			const handleChange = () => {
				render({})
			}

			this.listeners.push(handleChange)

			return () => {
				this.listeners.splice(this.listeners.indexOf(handleChange), 1)
			}
		}, [])

		return {
			pathName,
			previousPathName,
			title,
			previousTitle,
			search,
		}
		/*  eslint-enable react-hooks/rules-of-hooks */
	}

	private listeners: Array<() => void> = []

	private Notify() {
		for (let listener of this.listeners) {
			listener()
		}
	}
}

export const location = new LocationManager()
