import { ShowError } from "@frontend/gui/error-listener"
import React, { ReactNode, useEffect, useState } from "react"
import { location } from "./location"
import { PRODUCTION, TESTING } from "./other"

export const useMediaQuery = (query: string) => {
	if (TESTING) {
		return false
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [state, setState] = useState(window.matchMedia(query).matches)

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const mq = window.matchMedia(query)
		const onChange = () => {
			setState(mq.matches)
		}

		mq.addListener(onChange)

		onChange()

		return () => {
			mq.removeListener(onChange)
		}
	}, [query])

	return state
}
