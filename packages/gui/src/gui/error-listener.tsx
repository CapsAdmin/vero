import { api } from "@frontend/api/api"
import { userDataState } from "@frontend/api/driver-resources/userdata"
import "@frontend/app/thirdparty"
import "@frontend/gui/showcase"
import "@frontend/gui/translation"
import { location } from "@frontend/other/location"
import { PRODUCTION } from "@frontend/other/other"
import React, { ReactNode } from "react"
import { Card } from "./components/card"
import { Column, Row } from "./components/layout/row-column"
import { ShowModal } from "./components/modal-layer"
import { H1, H2 } from "./showcase/typography"
import { Icon } from "./themes/base"
import { InlineCode } from "./typography"

const getStackTrace = (err: unknown) => {
	let str: string | undefined

	if (err instanceof Error) {
		str = err.stack
	}

	if (!str) {
		str = new Error().stack || ""
	}

	let arr = str.split("\n").filter((line) => line.trim())

	if (!(err instanceof Error)) {
		// remove getStackTrace, EnableErrorListener and window.addEventListener from the stack
		return arr.slice(3)
	}

	return arr
}

const getMessage = (error: unknown) => {
	if (error === null) {
		return "null error"
	} else if (typeof error === "string") {
		return error
	} else if (typeof error === "object") {
		console.log(error, " errorLike is null?")
		let errorLike = error as { message: string }
		if (errorLike.message) {
			return errorLike.message
		} else {
			return JSON.stringify(error, null, 2)
		}
	}

	return String(error)
}

const blacklist = [/Loading chunk \d+ failed\./]

let lastMessageSent = ""

export const ShowError = (error: unknown, errorInfo?: React.ErrorInfo) => {
	const message = getMessage(error)

	for (const regexPattern of blacklist) {
		if (message.match(regexPattern)) {
			return
		}
	}

	const stackTrace = getStackTrace(error)

	if (errorInfo) {
		const stack = errorInfo.componentStack.split("\n")
		stackTrace.push("COMPONENT STACK:")
		stackTrace.push(...stack)
	}

	{
		// don't show the same error more than once

		const key = message + "_" + stackTrace.join("\n")

		if (lastMessageSent === key) {
			return
		}

		lastMessageSent = key
	}

	ShowModal(
		() => (
			<Card>
				<Column>
					<Row>
						<Icon type="Error" size="IconLarge" />
						<H1>app error!</H1>
					</Row>
					<H2>{message}</H2>
					{stackTrace.map((line, i) => (
						<InlineCode>{`${i + 1}. ${line}`}</InlineCode>
					))}
				</Column>
			</Card>
		),
		{},
	)
}

export const EnableErrorListener = () => {
	window.addEventListener("error", (errorEvent) => {
		// I can't find any documentation about null errors, but they seem to be
		// more like warnings than errors.
		if (!errorEvent.error) return

		ShowError(errorEvent.error)
	})

	// listen to promise rejections
	window.addEventListener("unhandledrejection", (errorEvent) => {
		ShowError(errorEvent.reason)
	})
}

// Error boundaries currently have to be classes.
export class ErrorBoundary extends React.Component<{
	children: ReactNode
}> {
	static getDerivedStateFromError(error: Error) {
		return { hasError: false }
	}

	override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		if (PRODUCTION) {
			ShowError(error, errorInfo)

			// go to a safe page
			location.Push("error")
		}
	}
	override render() {
		return this.props.children
	}
}
