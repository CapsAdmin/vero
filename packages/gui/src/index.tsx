import { App } from "@frontend/gui/app"
import "@frontend/gui/showcase"
import "@frontend/gui/translation"
// this polyfills pointer events for browsers that don't support it
import "pepjs"
import React from "react"
import ReactDOM from "react-dom"
globalThis.React = React


ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
)
