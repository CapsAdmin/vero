import { Page } from "@frontend/gui/components/layout/page"
import React from "react"
import { pages } from "../pages"
import { Text } from "../typography"

pages.Add("error", () => {
	return (
		<Page>
			<Text>You got an app error and have been directed here for your safety</Text>
		</Page>
	)
})
