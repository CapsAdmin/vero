import { Box } from "@frontend/gui/components/box"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { Showcase } from "@frontend/gui/showcase"
import { Text } from "@frontend/gui/typography"
import React, { ReactNode } from "react"
import { URL } from "../components/interactive/url"
import { ThemeColor, useContrastedColor } from "@vero/gui-theme"
export const H1 = (props: { children?: ReactNode; color?: ThemeColor }) => {
	return (
		<Row>
			<Text noAlignmentHacks color={props.color || "primary"} strong size="XXL" minimumSize="XL" element="h1">
				{props.children}
			</Text>
		</Row>
	)
}
export const H2 = (props: { children?: ReactNode }) => {
	const color = useContrastedColor("background", ["textH2Foreground", "textH2Background"])
	return (
		<Text element="h2" color={color} font="heading" size="XL" minimumSize="XL">
			&#160;
			{props.children}
		</Text>
	)
}
export const H3 = (props: { children?: ReactNode; color?: ThemeColor }) => {
	return (
		<Text element="h3" color={props.color} medium font="heading" minimumSize="L" size="L">
			{props.children}
		</Text>
	)
}
export const SmallHeader = (props: { children?: ReactNode }) => {
	return (
		<Text font="heading" size="L">
			{props.children}
		</Text>
	)
}
export const Body = (props: { children?: ReactNode }) => {
	return <Text size="M">{props.children}</Text>
}
export const BodySmall = (props: { children?: ReactNode }) => {
	return <Text size="S">{props.children}</Text>
}
export const BodyWeak = (props: { children?: ReactNode }) => {
	return (
		<Text size="M" weak>
			{props.children}
		</Text>
	)
}

Showcase("typography", () => {
	return (
		<Box>
			<Column>
				<H1>Header 1</H1>
				<H2>Header 2</H2>
				<H3>Header 3</H3>
				<SmallHeader>Small Header</SmallHeader>
				<Body>
					This is some body text just to demonstrate how it looks and stuff. Don’t worry too much about what it says. It it not the type of thing you are supposed to read, - although it is
					totally understandable that you would end up reading it as the choice of font, colors and sizes are so inviting.
				</Body>
				<BodySmall>A sample of some smol text</BodySmall>
				<BodyWeak>0123, Addresse 32</BodyWeak>
				<URL>Link</URL>
			</Column>
		</Box>
	)
})
