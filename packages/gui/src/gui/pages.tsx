import { location } from "@vero/util/location"
import { pages } from "@vero/util/pages"
import { Page } from "./components/layout/page"
import { Text } from "./typography"
export { pages } from "@vero/util/pages"

export const Pages = () => {
	const { pathName } = location.use()
	const FoundPage = pages.Find(pathName)

	return <FoundPage path={pathName} />
}

pages.Add("not-found", (props) => (
	<Page>
		<Text heading>page {props ? props.path : "unknown page"} not found</Text>
	</Page>
))

require("./pages/index")
