import React from "react"
import { Icon } from "../themes/base"
import { Text } from "../typography"
import { Row } from "./layout/row-column"

export const Loading = (props: { what: string; error?: string }) => {
	if (props.error) {
		return (
			<Row>
				<Icon type="Error" />
				<Text>{props.error}</Text>
			</Row>
		)
	}

	return (
		<Row>
			<Icon type="Loading" />
			<Text>loading {props.what}</Text>
		</Row>
	)
}
