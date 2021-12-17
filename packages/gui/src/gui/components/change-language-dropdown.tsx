import React from "react"
import { Icon } from "../themes/base"
import { languageSetting } from "../translation"
import { Text } from "../typography"
import { Clickable } from "./interactive/clickable"
import { Row } from "./layout/row-column"

export const ChangeLanguageDropdown = () => {
	languageSetting.use()
	return (
		<Clickable
			onClick={() => {
				const value: "en" | "no" = languageSetting.value === "en" ? "no" : "en"
				languageSetting.value = value
			}}
		>
			<Row columnAlign="center" itemPadding="XS">
				<Icon color="white" type="Globe32" size="IconMedium" />
				<Text color="textBackground" noAlignmentHacks weak>
					{languageSetting.value === "no" ? "English" : "Norsk"}
				</Text>
			</Row>
		</Clickable>
	)
}
