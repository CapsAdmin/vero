import anime from "animejs"
import IOSAddToHomeScreenImage from "assets//images/ios-add-to-homescreen.png"

import { Box } from "@frontend/gui/components/box"
import { Clickable } from "@frontend/gui/components/interactive/clickable"
import { URL } from "@frontend/gui/components/interactive/url"
import { Column, Row } from "@frontend/gui/components/layout/row-column"
import { modalQueueState, ShowModal } from "@frontend/gui/components/modal-layer"
import { useTranslation } from "@frontend/gui/translation"
import { Text } from "@frontend/gui/typography"
import { ConfirmModal } from "@frontend/gui/widgets/confirm"
import { Observer } from "@frontend/other/observer"
import { IsAndroid, IsChrome, IsDesktop, IsFirefox, IsIOS, IsPWA } from "@frontend/other/browser"
import React, { useState } from "react"
import { FaArrowDown, FaArrowUp } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { useTheme } from "../theme"
import { isAdmin, useUserData } from "@frontend/api/driver-resources/userdata"
import { Setting } from "@frontend/app/settings"

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 * @deprecated Only supported on Chrome and Android Webview.
 */
interface BeforeInstallPromptEvent extends Event {
	/**
	 * Returns an array of DOMString items containing the platforms on which the event was dispatched.
	 * This is provided for user agents that want to present a choice of versions to the user such as,
	 * for example, "web" or "play" which would allow the user to chose between a web version or
	 * an Android version.
	 */
	readonly platforms: Array<string>

	/**
	 * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
	 */
	readonly userChoice: Promise<{
		outcome: "accepted" | "dismissed"
		platform: string
	}>

	/**
	 * Allows a developer to show the install prompt at a time of their own choosing.
	 * This method returns a Promise.
	 */
	prompt(): Promise<void>
}

let deferredPrompt: BeforeInstallPromptEvent

const askToInstall = () => {
	if (!deferredPrompt) {
		console.log("was never asked to install")
		return
	}

	deferredPrompt.prompt()

	deferredPrompt.userChoice.then((choiceResult) => {
		if (choiceResult.outcome === "accepted") {
			console.log("User accepted the A2HS prompt")
		} else {
			console.log("User dismissed the A2HS prompt")
		}
	})
}

window.addEventListener("beforeinstallprompt", (e: any) => {
	e.preventDefault()

	deferredPrompt = e as BeforeInstallPromptEvent
})

const IosInstructions = (props: { onClose: () => void }) => {
	let theme = useTheme()
	const t = useTranslation("PWAOnboarding")

	return (
		<div
			style={{
				position: "absolute",
				left: 0,
				top: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 1000,
				background: "rgba(0,0,0,0.85)",
			}}
		>
			<Column rowAlign="center" columnAlign="center" style={{ width: "100%", height: "80%" }}>
				<Clickable
					autoFocus
					onClick={props.onClose}
					containerStyle={{
						//background: theme.colors.grey,
						borderRadius: "50%",
						padding: theme.sizes.XXS,
						position: "absolute",
						right: 30,
						top: 30,
						transform: "translate(50%, -50%)",
					}}
				>
					<IoMdClose size={theme.sizes.L} color={theme.colors.white} />
				</Clickable>

				<Column rowAlign="center" style={{ width: "80%" }}>
					<Box padding="M">
						<Column itemPadding="S">
							<img
								alt="ios howto"
								style={{
									borderColor: theme.colors.textForeground,
									borderWidth: "1px",
									borderStyle: "solid",
									width: "250px",
									height: "auto",
								}}
								src={IOSAddToHomeScreenImage}
							/>
						</Column>
					</Box>
				</Column>
			</Column>
			<div
				style={{
					position: "absolute",
					width: 100,
					left: "calc(50% - 50px)",
					//top: "calc(100vh - 250px)",
					bottom: 0,
					//background: "red",
				}}
			>
				<Column rowAlign="center" style={{ transform: "translateY(-100%)" }}>
					<Text style={{ textAlign: "center" }} heading color="white">
						{t("SafariInstructions")}
					</Text>
					<div
						ref={(e) => {
							if (!e) {
								return
							}

							anime({
								targets: e,
								translateY: [15, 0],
								duration: 750,
								loop: true,
							})
						}}
					>
						<FaArrowDown color="white"></FaArrowDown>
					</div>
				</Column>
			</div>
		</div>
	)
}

const FirefoxInstructions = (props: { onClose: () => void }) => {
	let theme = useTheme()

	const t = useTranslation("PWAOnboarding")

	return (
		<div
			style={{
				position: "absolute",
				left: 0,
				top: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 1000,
				background: "rgba(0,0,0,0.85)",
			}}
		>
			<Column rowAlign="center" columnAlign="center" style={{ width: "100%", height: "80%" }}>
				<Clickable
					autoFocus
					onClick={props.onClose}
					containerStyle={{
						//background: theme.colors.grey,
						borderRadius: "50%",
						padding: theme.sizes.XXS,
						position: "absolute",
						left: -30 + 10,
						top: 30,
						transform: "translate(50%, -50%)",
					}}
				>
					<IoMdClose size={theme.sizes.L} color={theme.colors.white} />
				</Clickable>
			</Column>
			<div
				style={{
					position: "absolute",
					width: 100,
					left: "calc(100% - 150px)",
					//top: "calc(100vh - 250px)",
					top: 15,
					//background: "red",
				}}
			>
				<Column rowAlign="center" style={{ transform: "translateY(0%)" }}>
					<div
						ref={(e) => {
							if (!e) {
								return
							}

							anime({
								targets: e,
								translateY: [15, 0],
								duration: 750,
								loop: true,
							})
						}}
					>
						<FaArrowUp color="white"></FaArrowUp>
					</div>
					<Text style={{ textAlign: "center" }} heading color="white">
						{t("FirefoxInstructions")}
					</Text>
				</Column>
			</div>
		</div>
	)
}

export const disablePWAPromptSetting = Setting("disablePWAPrompt", false)
const temporaryDisablePWAModalState = new Observer(false)

export const PWAPrompt = () => {
	let theme = useTheme()
	const userdata = useUserData()
	disablePWAPromptSetting.use()

	const [showIosInstructions, setShowIosInstructions] = useState(false)
	const [showFirefoxInstructions, setShowFirefoxInstructions] = useState(false)
	const [closePrompt, setClosePrompt] = useState(false)
	const t = useTranslation("PWAOnboarding")
	const [temporaryDisablePWAModal, setTemporaryDisablePWAModal] = temporaryDisablePWAModalState.use()
	const [modalQueue] = modalQueueState.use()

	if (modalQueue.length > 0) {
		return null
	}

	if (IsPWA || (IsDesktop && !isAdmin())) {
		return null
	}

	if (closePrompt || disablePWAPromptSetting.value || temporaryDisablePWAModal) {
		return null
	}

	if (!userdata.driver_id) {
		return null
	}

	return (
		<>
			{showIosInstructions ? (
				<IosInstructions
					onClose={() => {
						setShowIosInstructions(false)
					}}
				/>
			) : null}
			{showFirefoxInstructions ? (
				<FirefoxInstructions
					onClose={() => {
						setShowFirefoxInstructions(false)
					}}
				/>
			) : null}

			<Row
				style={{
					background: theme.colors.neutral,
					minHeight: theme.sizes.XXL,
					padding: theme.sizes.M,
					paddingRight: theme.sizes.XL,
					textAlign: "center",
				}}
				rowAlign="center"
				columnAlign="center"
			>
				<Column rowAlign="center" itemPadding="M">
					<Text strong>{t("Title") + " (" + t("SafariNotice") + ")"}</Text>
					{IsIOS ? (
						<URL
							onClick={() => {
								//askToInstall()

								if (IsChrome) {
									//	return
								}

								setShowIosInstructions(true)
							}}
						>
							{t("InstallText")}
						</URL>
					) : IsAndroid && IsFirefox ? (
						<URL
							onClick={() => {
								//askToInstall()
								setShowFirefoxInstructions(true)
							}}
						>
							{t("ManualText")}
						</URL>
					) : (
						<URL
							onClick={() => {
								askToInstall()
							}}
						>
							{t("ManualText")}
						</URL>
					)}
					<Clickable
						autoFocus
						onClick={async () => {
							console.log(new Error().stack)
							ShowModal(ConfirmModal, {
								description: t("ModalText"),
								textConfirm: t("ModalNever"),
								textCancel: t("ModalLater"),
								onConfirm: (b: boolean) => {
									setClosePrompt(true)
									if (b) {
										disablePWAPromptSetting.value = true
									} else {
										setTemporaryDisablePWAModal(true)
									}
								},
								onClose: () => {},
							})
						}}
					>
						<Text>{t("Dismiss")}</Text>
					</Clickable>
				</Column>
			</Row>
		</>
	)
}
