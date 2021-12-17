import { location } from "@frontend/other/location"
import { pages } from "@frontend/other/pages"
import { useEffect } from "react"
import "./error"

pages.Add("index", () => {
	useEffect(() => {
		location.Replace("dashboard")
	}, [])

	return null
})
