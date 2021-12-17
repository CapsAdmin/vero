import { pages } from "@vero/util/pages"
import { Page } from "../components/layout/page"
import { Text } from "../typography"
import "./error"
import "./gui-showcase"
import "./settings"

pages.Add("index", () => {
	return (
		<Page>
			<Text heading>home page</Text>
		</Page>
	)
})
