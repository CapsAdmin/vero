import React from "react"
globalThis.React = React

import "@frontend/app/thirdparty"
import { App } from "@frontend/gui/app"
import "@frontend/gui/showcase"
import "@frontend/gui/translation"
import ReactDOM from "react-dom"
import { ErrorBoundary } from "./gui/error-listener"

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById("root"),
)
