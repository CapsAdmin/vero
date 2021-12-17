import { api } from "@frontend/api/api"
import { useUserData } from "@frontend/api/driver-resources/userdata"
import { Clickable } from "@frontend/gui/components/interactive/clickable"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { Line } from "@frontend/gui/components/line"
import { ThemeIcon, useTheme } from "@frontend/gui/theme"
import { useTranslation } from "@frontend/gui/translation"
import { Text } from "@frontend/gui/typography"
import { location } from "@frontend/other/location"
import { Observer } from "@frontend/other/observer"
import { pages } from "@frontend/other/pages"
import React, { ReactNode, useEffect } from "react"
import { URL } from "../components/interactive/url"
import { Gutter } from "../components/layout/gutter"
import { Icon } from "../themes/base"
import { AvatarExperienceBar } from "./avatar-experience-bar"
import { useWorkDays } from "@frontend/api/driver-resources/work-days"

export const enableDrawer = new Observer(false)
enableDrawer.subscribe((b) => {
	pages.EnableScroll(!b)
})

const DrawerButton = (props: { children?: ReactNode; icon: ThemeIcon; page: string; relative?: boolean; onClick?: () => void }) => {
	const { pathName } = location.use()
	const [drawerEnabled, setDrawerEnabled] = enableDrawer.use()

	useEffect(() => {
		const keyUp = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setDrawerEnabled(false)
			}
		}
		window.addEventListener("keyup", keyUp)

		return () => {
			window.removeEventListener("keyup", keyUp)
		}
	}, [setDrawerEnabled])

	let selected = pathName.startsWith(props.page)

	if (pathName === "" && props.page === "dashboard") {
		selected = true
	}

	const t = useTranslation("PageTitles")
	const redirect = () => {
		if (props.relative) {
			location.Push("/" + props.page)
		} else {
			location.Push("/" + props.page)
		}
	}
	return (
		<Clickable
			disabled={!drawerEnabled}
			style={{ width: "100%" }}
			containerStyle={{ flex: 1 }}
			onClick={() => {
				if (props.onClick) {
					props.onClick()
				} else {
					redirect()
				}
				setDrawerEnabled(false)
			}}
		>
			<Row itemPadding={"S"} rowAlign="start" columnAlign="center" key={props.page}>
				<Icon type={props.icon} size="IconMedium" />
				<Text strong={selected}>{t(props.page as "dashboard")}</Text>
			</Row>
		</Clickable>
	)
}

const Header = () => {
	return <AvatarExperienceBar driverPoints={900000} />
}

export const NavigationDrawer = () => {
	const theme = useTheme()
	const [drawerEnabled, setDrawerEnabled] = enableDrawer.use()
	const t = useTranslation("Settings")

	return (
		<>
			<div
				onPointerDown={() => setDrawerEnabled(false)}
				style={{
					background: drawerEnabled ? "rgba(0,0,0, 0.75)" : "rgba(0,0,0,0)",
					transition: "background-color 150ms ease-in-out",
					position: "fixed",
					top: 0,
					left: 0,

					minWidth: "100%",
					minHeight: "100%",
					pointerEvents: drawerEnabled ? undefined : "none",
					zIndex: 1000,
					display: "flex",
				}}
			></div>
			<div
				style={{
					position: "fixed",
					top: 0,
					zIndex: 1001,
					height: "100%",
					width: 275,
					transition: "transform 250ms ease-in-out",
					overflowY: "auto",
					right: "0%",
					transform: drawerEnabled ? "translate(0%, 0%)" : "translate(100%, 0%)",
					background: theme.colors.textBackground,
					boxShadow: theme.shadow,
				}}
			>
				<Column
					itemPadding="M"
					rowAlign="start"
					style={{
						padding: theme.sizes.L,
					}}
					stretchRow
				>
					<div className="userAvatar">
						<Header />
					</div>
					<Line />
					<div className="dashboard">
						<DrawerButton page="dashboard" icon="Home32"></DrawerButton>
					</div>
					<div className="reviews">
						<DrawerButton page="reviews" icon="Comment32"></DrawerButton>
					</div>
					{/*<DrawerButton page="accuracy" icon="Accuracy32"></DrawerButton>}*/}
					<div className="leaderboard">{<DrawerButton page="leaderboard" icon="Trophy32"></DrawerButton>}</div>
					<div className="productivity">
						<DrawerButton page="productivity" icon="Productivity32"></DrawerButton>
					</div>
					<div className="service">
						<DrawerButton page="service" icon="Service32"></DrawerButton>
					</div>
					{/*<DrawerButton page="deviations" icon="Deviation32"></DrawerButton>*/}
					<Line />
					<div className="feedback">
						<DrawerButton page="feedback" icon="Comment32"></DrawerButton>
					</div>
					<Line></Line>
					<div className="profile">
						<DrawerButton page="profile" icon="Warrior32"></DrawerButton>
					</div>
					<div className="settings">
						<DrawerButton page="settings" icon="Settings"></DrawerButton>
					</div>
					<div className="about">
						<DrawerButton page="about" icon="Quality32"></DrawerButton>
					</div>
					<Line />
					<Gutter size="none" />
					<Row itemPadding="XL" rowAlign="center">
						<URL
							color="negative"
							size="L"
							onClick={async () => {
								await api.Logout()
								setDrawerEnabled(false)
								location.Replace("/")
							}}
						>
							{t("SignOut")}
						</URL>
					</Row>
					<Gutter size="none" />
				</Column>
			</div>
		</>
	)
}
