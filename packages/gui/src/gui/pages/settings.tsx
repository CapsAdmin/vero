import { api } from "@frontend/api/api"
import { driverIdOverrideSetting, getRole, isAdmin, overrideRole, submitPartialUserData, userDataState, useUserData } from "@frontend/api/driver-resources/userdata"
import { Card } from "@frontend/gui/components/card"
import { Button } from "@frontend/gui/components/interactive/button"
import { DropDown } from "@frontend/gui/components/interactive/drop-down"
import { TextInput } from "@frontend/gui/components/interactive/text-input"
import { Page } from "@frontend/gui/components/layout/page"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { IsAndroid, IsChrome, IsDesktop, IsFirefox, IsIOS, IsMobile, IsPWA, IsSafari } from "@frontend/other/browser"
import { location } from "@frontend/other/location"
import { storageClear, storageGetItem, storageSetItem } from "@frontend/other/storage"
import React, { useEffect, useState } from "react"
import Select from "react-dropdown-select"
import { Box } from "../components/box"
import { Clickable } from "../components/interactive/clickable"
import { ToggleSwitch } from "../components/interactive/toggle-switch"
import { URL } from "../components/interactive/url"
import { Gutter } from "../components/layout/gutter"
import { Loading } from "../components/loading"
import { pages } from "../pages"
import { H2 } from "../showcase/typography"
import { GetAvailableThemeNames, themeNameSetting, useTheme } from "../theme"
import { Icon } from "../themes/base"
import { languageSetting, useTranslation } from "../translation"
import { Text } from "../typography"
import { AvatarImage, avatar } from "../widgets/avatar"
import { AvatarSelector } from "../widgets/avatar-selector"
import { Header } from "../widgets/header"

export const ChangeRole = () => {
	const roles = ["driver", "transportleder", "admin"]

	return (
		<Column itemPadding="S" columnAlign="center">
			<Text size="XL">{"role override"}</Text>
			<DropDown
				data={roles}
				titles={roles}
				selected={roles.indexOf(getRole())}
				onSelect={(value, i, data) => {
					overrideRole(value)
				}}
			/>
		</Column>
	)
}

const ChangeLanguageDropdown = () => {
	const [language, setLanguage] = languageSetting.use()
	const tLanguages = useTranslation("Languages")
	const t = useTranslation("Settings")

	return (
		<Column columnAlign="center">
			<Text>{t("Language")}</Text>
			<DropDown
				data={["auto", "en", "no"]}
				titles={[tLanguages("auto") as string, tLanguages("en") as string, tLanguages("no") as string]}
				selected={["auto", "en", "no"].indexOf(language)}
				onSelect={(value, i, data) => {
					setLanguage(value)
				}}
			/>
		</Column>
	)
}

const ChangeDriverId = () => {
	const [userdata] = userDataState.use()
	const [activity, setActivity] = useState<
		Array<{
			title: string
			driverId: string
		}>
	>([])

	useEffect(() => {
		;(async () => {
			try {
				const data = await api.GetDriverEventActivity()
				const activity = data.map((val) => ({
					title: val.driverId + " - (" + val.eventCount + " events)",
					driverId: val.driverId,
				}))
				activity.unshift({
					title: userdata.driver_id + " - (you)",
					driverId: userdata.driver_id,
				})

				setActivity(activity)
			} catch (err) {
				console.error(err)
				setActivity([
					{
						title: (err as any).message,
						driverId: "",
					},
				])
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (activity.length === 0) {
		return <Loading what="activity"></Loading>
	}

	return (
		<Select
			values={[activity.find((v) => v.driverId === driverIdOverrideSetting.value) || activity[0]]}
			options={activity}
			labelField="title"
			onChange={([selected]) => {
				if (selected) {
					driverIdOverrideSetting.value = selected.driverId
				}
			}}
		/>
	)
}
pages.Add("settings", () => {
	const userdata = useUserData()
	const theme = useTheme()
	const t = useTranslation("Settings")

	return (
		<Page renderHeader={() => <Header noAvatar />}>
			<H2>{t("PersonalHeader")}</H2>
			<Card>
				<Row>
					<AvatarImage data={userdata.avatar || avatar.defaultAvatar} size={theme.sizes.XXL * 1.5} />
					<Column style={{ flex: 1 }} itemPadding="L" rowAlign="end">
						<H2>{userdata.nickname}</H2>
						<URL color="inactive" size="L" url="/settings/change-nickname">
							{t("ChangeNickname")}
						</URL>
						<URL size="L" url="/settings/edit-avatar">
							{t("ChangeAvatar")}
						</URL>
					</Column>
				</Row>
			</Card>
			<H2>{t("GeneralHeader")}</H2>
			<Card>
				<Text>{t("Theme")}</Text>
				<DropDown
					data={GetAvailableThemeNames()}
					selected={GetAvailableThemeNames().indexOf(themeNameSetting.value)}
					onSelect={(str) => {
						themeNameSetting.value = str
					}}
				/>
				<Gutter size="none" />
				<ChangeLanguageDropdown />
			</Card>
			<H2>{t("AccountHeader")}</H2>
			<Card>
				<Row columnAlign="center">
					<Icon type="Trophy32" size="IconMedium" />
					<Text style={{ flex: 1 }}>{t("TeamParticipate")}</Text>
					<ToggleSwitch
						on={userdata.teamOptIn}
						onChange={async () => {
							await submitPartialUserData({
								teamOptIn: !userdata.teamOptIn,
							})
						}}
					/>
				</Row>
			</Card>
			<Column itemPadding="XL" rowAlign="center">
				<URL size="L" url="/about">
					{t("About")}
				</URL>
				<URL size="L" url="/change-nickname">
					{/* TODO skal vel egentlig føre til å kunne ta onboardingen en gang til */}
					{t("Help")}
				</URL>
				<URL
					size="L"
					onClick={async () => {
						await api.Logout()
						location.Replace("/")
					}}
				>
					{t("SignOut")}
				</URL>
				<Gutter size="none"></Gutter>
			</Column>
			{userdata.role !== "admin" ? null : <ChangeRole />}
			{!isAdmin() ? null : (
				<Column>
					<Card>
						<ChangeDriverId />
					</Card>
					<Card>
						<Text heading>browser and platform detection</Text>
						<Text color={IsMobile ? "positive" : "textForeground"}>IsMobile = {IsMobile.toString()}</Text>
						<Text color={IsIOS ? "positive" : "textForeground"}>IsIOS = {IsIOS.toString()}</Text>
						<Text color={IsAndroid ? "positive" : "textForeground"}>IsAndroid = {IsAndroid.toString()}</Text>
						<Text color={IsFirefox ? "positive" : "textForeground"}>IsFirefox = {IsFirefox.toString()}</Text>
						<Text color={IsChrome ? "positive" : "textForeground"}>IsChrome = {IsChrome.toString()}</Text>
						<Text color={IsSafari ? "positive" : "textForeground"}>IsSafari = {IsSafari.toString()}</Text>
						<Text color={IsDesktop ? "positive" : "textForeground"}>IsDesktop = {IsDesktop.toString()}</Text>
						<Text color={IsPWA ? "positive" : "textForeground"}>IsPWA = {IsPWA.toString()}</Text>
					</Card>

					<Card>
						<Text heading>local storage</Text>

						<Button
							onClick={() => {
								let tk = storageGetItem("tokens")!
								storageClear()
								storageSetItem("tokens", tk)
							}}
						>
							{"clear storage (except tokens)"}
						</Button>
					</Card>

					<Card>
						<Button
							onClick={() => {
								api.Deregister()
								location.Replace("login")
							}}
						>
							{"delete logged-in account"}
						</Button>
					</Card>
				</Column>
			)}
		</Page>
	)
})

pages.Add("settings/change-nickname", () => {
	const userdata = useUserData()
	const [nick, setNick] = useState(userdata.nickname)
	const t = useTranslation("Settings")

	return (
		<Page>
			<Column itemPadding="S" style={{ flex: 1 }} columnAlign="center">
				<div style={{ flex: 1 }}>
					<TextInput
						data-hj-suppress
						title=""
						value={nick}
						onTextChange={(str) => {
							setNick(str)
						}}
					></TextInput>
				</div>
				<Button
					backgroundColor="positive"
					disabled={nick === userdata.nickname}
					onClick={async () => {
						await submitPartialUserData({
							nickname: nick,
						})
						location.Pop()
					}}
				>
					{t("Nickname")}
				</Button>
			</Column>
		</Page>
	)
})

export const SetupAvatar = (props: { skippable?: boolean }) => {
	const userdata = useUserData()
	const [avatarData, setAvatarData] = useState(userdata.avatar || avatar.defaultAvatar)
	const modified = JSON.stringify(avatarData) === JSON.stringify(userdata.avatar)
	const save = async () => {
		await submitPartialUserData({ avatar: avatarData })
		location.Pop()
	}
	return (
		<>
			<div style={{ top: 130, position: "fixed", zIndex: 50 }}>
				<AvatarImage size={115} data={avatarData} />
			</div>
			<Column>
				<Box style={{ zIndex: 100 }}>
					<Column>
						<Row rowAlign="space between">
							{!props.skippable ? null : (
								<Row itemPadding="XXS">
									<URL
										onClick={() => {
											setAvatarData(avatar.defaultAvatar)
										}}
									>
										Hopp over
									</URL>
									<Icon type="Right" />
								</Row>
							)}
						</Row>
						<Column>
							<Column>
								<Column rowAlign="center">
									<div style={{ position: "relative" }}>
										<AvatarImage size={115} data={avatarData} />
										<Clickable
											onClick={() => {
												setAvatarData(avatar.GetRandomAvatarData())
											}}
											containerStyle={{ position: "absolute", bottom: 0, right: 0, zIndex: 1 }}
										>
											<Icon type="Dice32" size="IconMedium"></Icon>
										</Clickable>
									</div>
								</Column>
							</Column>
							<Button disabled={modified} onClick={save} backgroundColor="positive">
								{"Save"}
							</Button>
						</Column>
					</Column>
				</Box>
				<AvatarSelector
					data={avatarData}
					onUpdate={(data) => {
						setAvatarData(data)
					}}
				></AvatarSelector>
				<Button onClick={save} disabled={modified} backgroundColor="positive">
					{"Save"}
				</Button>
			</Column>
		</>
	)
}

pages.Add("settings/edit-avatar", () => {
	return (
		<Page renderHeader={() => <Header noAvatar />}>
			<SetupAvatar />
		</Page>
	)
})
