import { useUserData } from "@frontend/api/driver-resources/userdata"
import { ClickableIcon } from "@frontend/gui/components/interactive/clickable-icon"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { ThemeColor, useContrastedColor, useTheme } from "@frontend/gui/theme"
import { Text } from "@frontend/gui/typography"
import { location } from "@frontend/other/location"
import { ReactNode, useEffect, useRef } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { Clickable } from "../components/interactive/clickable"
import { UserAvatar } from "../components/user-avatar"
import { H1 } from "../showcase/typography"
import { avatar } from "./avatar"
import { enableDrawer } from "./navigation-drawer"

export const BackButton = (props: { color?: ThemeColor }) => {
	const theme = useTheme()

	return window.history.length > 0 ? (
		<ClickableIcon onClick={() => window.history.back()}>
			<FaArrowLeft style={{ pointerEvents: "none" }} color={theme.colors[props.color || "textForeground"]}></FaArrowLeft>
		</ClickableIcon>
	) : null
}

const Avatar = (props: { minified?: boolean }) => {
	return <UserAvatar driverPoints={90000} size={props.minified ? "IconSmall" : "IconLarge"} lvlScale={props.minified ? 0.01 : 1.35} data={avatar.defaultAvatar}></UserAvatar>
}

const HeaderAvatar = (props: { minified?: boolean }) => {
	const [, setDrawerEnabled] = enableDrawer.use()

	return (
		<div className="mainNavigation">
			<Clickable
				onClick={() => {
					setDrawerEnabled(true)
				}}
			>
				<Avatar minified={props.minified} />
			</Clickable>
		</div>
	)
}

export const Header = (props: {
	title?: string
	backTitle?: string
	onGoBack?: () => void
	renderBottomChildren?: (minified: boolean) => ReactNode
	noAvatar?: boolean
	children?: ReactNode
	minified?: boolean
	permanentlyMinified?: boolean
}) => {
	const theme = useTheme()

	const { title, previousTitle } = location.use()
	const canGoBack = !!previousTitle
	const goBackCallback = canGoBack
		? () => {
				window.history.back()
				if (props.onGoBack) props.onGoBack()
		  }
		: undefined
	const minified = props.minified

	const containerRef = useRef<HTMLDivElement | null>(null)
	const fixedHeightRef = useRef<HTMLDivElement | null>(null)
	const textColor = useContrastedColor("header")

	useEffect(() => {
		const fixedHeight = fixedHeightRef.current!
		if (!fixedHeight) return
		const container = containerRef.current!
		if (!container) return

		fixedHeight.style.height = container.clientHeight + "px"
	}, [])

	let fixedHeight = theme.sizes.XS * 2 + theme.sizes.L * 2
	const height = props.minified ? theme.sizes.S * 1.5 + theme.sizes.S * 2 : fixedHeight

	if (props.permanentlyMinified) {
		fixedHeight = height
	}

	const children = props.children ? props.children : <HeaderAvatar minified={minified} />

	return (
		<>
			<header
				style={{
					position: "fixed",
					top: 0,
					left: 0,

					width: "100%",
					boxSizing: "border-box",

					margin: 0,
					zIndex: 100,

					transition: "height 50ms ease-in-out",

					padding: minified ? theme.sizes.XS : theme.sizes.S,
					paddingLeft: minified ? theme.sizes.XS : theme.sizes.M,
					paddingRight: minified ? theme.sizes.XS : theme.sizes.M,

					background: theme.colors.header,
				}}
				ref={containerRef}
			>
				<Column>
					{minified ? (
						<Row rowAlign="space between" columnAlign="center">
							<Clickable onClick={goBackCallback}>
								<Row itemPadding="S" columnAlign="center">
									{canGoBack ? <FaArrowLeft style={{ pointerEvents: "none" }} color={theme.colors[textColor]}></FaArrowLeft> : null}
									<H1 color={textColor}>{props.title || title}</H1>
								</Row>
							</Clickable>
							{props.noAvatar ? null : children}
						</Row>
					) : (
						<Row rowAlign="space between">
							<Column itemPadding="XS" columnAlign="center">
								<Clickable onClick={goBackCallback}>
									<Column itemPadding="none" rowAlign="baseline">
										{canGoBack ? (
											<Row itemPadding="S" columnAlign="center">
												<FaArrowLeft style={{ pointerEvents: "none" }} color={theme.colors[textColor]}></FaArrowLeft>
												<Text noAlignmentHacks color={textColor}>
													{props.backTitle || previousTitle}
												</Text>
											</Row>
										) : null}
										<H1 color={textColor}>{props.title || title}</H1>
									</Column>
								</Clickable>
							</Column>
							{props.noAvatar ? null : children}
						</Row>
					)}
					{props.renderBottomChildren ? props.renderBottomChildren(!!minified) : null}
				</Column>
			</header>
			<div ref={fixedHeightRef} style={{ height: fixedHeight }}></div>
		</>
	)
}
