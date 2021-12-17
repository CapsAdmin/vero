import { Card } from "@frontend/gui/components/card"
import { Clickable } from "@frontend/gui/components/interactive/clickable"
import { DropDown } from "@frontend/gui/components/interactive/drop-down"
import { Page } from "@frontend/gui/components/layout/page"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { GetShowcases, ShowcaseType } from "@frontend/gui/showcase"
import { GetAvailableThemeNames, themeNameSetting, useTheme } from "@frontend/gui/theme"
import { Text } from "@frontend/gui/typography"
import { location } from "@frontend/other/location"
import { pages } from "@frontend/other/pages"
import React, { useState } from "react"

const ThemeHeader = () => {
	const theme = useTheme()

	return (
		<div style={{ background: theme.colors.card, height: theme.sizes.L * 2 }}>
			<Row columnAlign="center">
				<DropDown
					data={GetAvailableThemeNames()}
					selected={GetAvailableThemeNames().indexOf(themeNameSetting.value)}
					onSelect={(str) => {
						themeNameSetting.value = str
					}}
				/>
			</Row>
		</div>
	)
}

pages.Add("gui-showcase", () => {
	const { search } = location.use()
	const [selected, setSelected] = useState<ShowcaseType | null>(GetShowcases().filter((showcase) => showcase.title === search.showcase)[0])
	let lastCategory = ""

	return (
		<Page renderHeader={() => <ThemeHeader />}>
			<Row>
				<Card>
					<Column>
						{GetShowcases()
							.sort((a, b) => {
								if (a.category === b.category) {
									return -1
								} else {
									return 1
								}
							})
							.map((val, i) => {
								let e = (
									<Column key={i}>
										<Clickable
											onClick={() => {
												setSelected(val)
												window.history.replaceState(null, "", "?showcase=" + val.title)
											}}
										>
											<Text noWrap>{val.title}</Text>
										</Clickable>
									</Column>
								)

								if (val.category && val.category !== lastCategory) {
									lastCategory = val.category
									return [
										<Text heading key="category">
											{lastCategory}
										</Text>,
										e,
									]
								}

								return e
							})}
					</Column>
				</Card>
				{!selected ? null : (
					<Column style={{ flex: 1 }}>
						<Text heading style={{ textAlign: "center" }}>
							{selected.title}
						</Text>
						<Card style={{ flex: 1 }}>
							<selected.render />
						</Card>
					</Column>
				)}
			</Row>
		</Page>
	)
})
