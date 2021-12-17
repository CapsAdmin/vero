import Star from "@frontend/assets/images/star.png"
import { Card } from "@frontend/gui/components/card"
import { Button } from "@frontend/gui/components/interactive/button"
import { Checkbox } from "@frontend/gui/components/interactive/checkbox"
import { Clickable } from "@frontend/gui/components/interactive/clickable"
import { DropDown } from "@frontend/gui/components/interactive/drop-down"
import { InteractiveDebug } from "@frontend/gui/components/interactive/interactive"
import { LabeledCheckbox } from "@frontend/gui/components/interactive/labeled-checkbox"
import { TextInput } from "@frontend/gui/components/interactive/text-input"
import { URL } from "@frontend/gui/components/interactive/url"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { ShowModal } from "@frontend/gui/components/modal-layer"
import { ScreenShake } from "@frontend/gui/components/perspective"
import { Showcase } from "@frontend/gui/showcase"
import { Text } from "@frontend/gui/typography"
import { ConfirmModal } from "@frontend/gui/widgets/confirm"
import { Rumble } from "@frontend/other/sounds"
import React, { useRef, useState } from "react"
import { Icon } from "../themes/base"

const starImage = document.createElement("img")
starImage.src = Star

Showcase("visual feedback", () => {
	const [toggleOn, setToggleOn] = useState(false)

	const [number] = useState(0)
	const [targetNumber, setTargetNumber] = useState(0)
	const numberParent = useRef<HTMLDivElement>(null)

	return (
		<Card>
			<Column columnAlign="center">
				<Text>
					This is a <URL>link</URL>!!!
				</Text>
				<Row wrap="space around">
					<LabeledCheckbox onClick={() => setTargetNumber(100)} checked={targetNumber === 100}>
						100
					</LabeledCheckbox>
					<LabeledCheckbox onClick={() => setTargetNumber(1000)} checked={targetNumber === 1000}>
						1000
					</LabeledCheckbox>
				</Row>

				<div style={{ display: "inline-block" }}>
					<div ref={numberParent} style={{ display: "inline-block" }}>
						{Array.from(Math.ceil(number).toString()).map((char, i) => (
							<div key={i} style={{ display: "inline-block" }}>
								<Text heading style={{ display: "inline-block" }}>
									{char}
								</Text>
							</div>
						))}
					</div>
				</div>

				<Row>
					<Clickable>
						<Icon type="Settings" size="IconLarge" />
					</Clickable>
					<Clickable>
						<Icon type="FuriousDriver64" size="IconLarge" />
					</Clickable>
					<Clickable>
						<Icon type="Deviation64" size="IconLarge" />
					</Clickable>
					<Clickable>
						<Icon type="Service64" size="IconLarge" />
					</Clickable>
				</Row>
				<TextInput title="name"></TextInput>
				<Button
					onClick={() => {
						ScreenShake(500, 140, 0.2)
						Rumble()
					}}
				>
					shake!
				</Button>

				<DropDown data={["1", "2", "3"]} titles={["one", "two", "three"]} selected={0}></DropDown>
				<Button
					onClick={() => {
						;(() => 0)()
					}}
				>
					normal
				</Button>
				<Button
					weak
					onClick={() => {
						;(() => 0)()
					}}
				>
					weak
				</Button>
				<InteractiveDebug></InteractiveDebug>
				<Button
					onClick={async () => {
						await new Promise<void>((resolve, reject) => {
							ShowModal(ConfirmModal, {
								title: "Are you sure?",
								description: "Do you really want to click ok? This cannot be undone.",
								onConfirm: () => {
									resolve()
								},
								onClose: () => {
									resolve()
								},
							})
						})
					}}
				>
					{"modal"}
				</Button>
				<Button
					onClick={async () => {
						await new Promise<void>((resolve) => {
							setTimeout(() => {
								resolve()
							}, 2000)
						})
					}}
				>
					{"loading"}
				</Button>
				<Row columnAlign="center">
					<Button disabled={toggleOn}>{"disabled"}</Button>
					<Checkbox
						checked={toggleOn}
						onClick={() => {
							setToggleOn(!toggleOn)
						}}
					></Checkbox>
				</Row>
			</Column>
		</Card>
	)
})
