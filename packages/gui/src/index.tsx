import React from "react"
globalThis.React = React

// this polyfills pointer events for browsers that don't support it
import "pepjs"
import { App } from "@frontend/gui/app"
import "@frontend/gui/showcase"
import "@frontend/gui/translation"
import ReactDOM from "react-dom"
import { ErrorBoundary } from "./gui/error-listener"

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
)
