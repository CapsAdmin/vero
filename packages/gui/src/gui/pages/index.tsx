import { location } from "@frontend/other/location"
import { pages } from "@frontend/other/pages"
import { useEffect } from "react"
import { Page } from "../components/layout/page"
import { Text } from "../typography"
import "./error"
import "./settings"
import "./gui-showcase"

pages.Add("index", () => {
	return (
		<Page>
			<Text heading>home page</Text>
		</Page>
	)
})
