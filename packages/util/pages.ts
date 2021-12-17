import { Clamp } from "./other"
import { useEffect, useRef, useState } from "react"
import { getDriverId } from "@frontend/api/driver-resources/userdata"

type PageRenderer = (props?: { path?: string }) => JSX.Element | null
class PageManager {
	private pages = new Map<string, PageRenderer>()
	private scrollCallback: (() => void) | undefined = undefined
	Add(path: string, pageRenderer: PageRenderer) {
		this.pages.set(path, pageRenderer)
	}

	Remove(path: string) {
		this.pages.delete(path)
	}

	Find(path: string) {
		let FoundPage = this.pages.get(path)

		if (!FoundPage) {
			return this.pages.get("not-found")!
		}

		return FoundPage
	}

	EnableScroll(b: boolean) {
		if (b) {
			if (this.scrollCallback) {
				window.removeEventListener("scroll", this.scrollCallback)
				this.scrollCallback = undefined
			}
		} else {
			if (!this.scrollCallback) {
				const scrollTop = window.scrollY
				const scrollLeft = window.scrollY

				this.scrollCallback = () => {
					window.scrollTo(scrollLeft, scrollTop)
				}

				window.addEventListener("scroll", this.scrollCallback)
			}
		}
	}
}

export const pages = new PageManager()

export function usePageScroll(threshold: number = 0) {
	const lastY = useRef(window.scrollY)
	const curY = useRef(window.scrollY)

	const [minified, setMinified] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			let y = window.scrollY

			let diff = y - lastY.current
			curY.current = Clamp(curY.current + diff, -threshold, threshold)

			setMinified(curY.current >= 0)

			lastY.current = y
		}
		document.addEventListener("scroll", onScroll)

		return () => {
			document.removeEventListener("scroll", onScroll)
		}
	}, [threshold])

	return minified
}
