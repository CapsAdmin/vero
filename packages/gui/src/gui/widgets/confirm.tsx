import { Button } from "@frontend/gui/components/interactive/button"
import React from "react"
import { Card } from "@frontend/gui/components/card"
import { Row } from "@frontend/gui/components/layout/row-column"
import { Text } from "../typography"

export const ConfirmModal = (props: { title: string; description: string; onConfirm: (b: boolean) => void; onClose: () => void; textConfirm?: string; textCancel?: string }) => {
	return (
		<Card>
			{props.title ? <Text heading>{props.title}</Text> : null}
			<Text>{props.description}</Text>
			<Row>
				<Button
					weak
					onClick={async () => {
						props.onConfirm(false)
						props.onClose()
					}}
				>
					{props.textCancel || "Cancel"}
				</Button>
				<Button
					focus
					onClick={async () => {
						props.onConfirm(true)
						props.onClose()
					}}
				>
					{props.textConfirm || "OK"}
				</Button>
			</Row>
		</Card>
	)
}

export const MessageModal = (props: { title: string; description: string; onConfirm: (b: boolean) => void; textConfirm?: string; onClose: () => void }) => {
	return (
		<Card>
			{props.title ? <Text heading>{props.title}</Text> : null}
			<Text>{props.description}</Text>
			<Row>
				<Button
					focus
					onClick={async () => {
						props.onConfirm(true)
						props.onClose()
					}}
				>
					{props.textConfirm || "OK"}
				</Button>
			</Row>
		</Card>
	)
}
