import { useTheme } from "@frontend/gui/theme"
import { Observer } from "@frontend/other/observer"
import { pages } from "@frontend/other/pages"
import React, { useEffect, useRef } from "react"
import { Icon } from "../themes/base"
import { AbsolutePositionCenter } from "./absolute-position-center"
import { Clickable } from "./interactive/clickable"
import { Gutter } from "./layout/gutter"

export const modalQueueState = new Observer<
	Array<{
		callback: (props: any) => JSX.Element
		props: any
	}>
>([])

export const ShowModal = (func: (props: any) => JSX.Element, props: any) => {
	if (props.onShow && !props.onShow()) {
		return
	}

	let modal = {
		callback: func,
		props,
	}

	console.trace("showing modal")

	const userOnClose = props.onClose

	props.onClose = async () => {
		let queueCopy = [...modalQueueState.value]
		let modalIndex = queueCopy.indexOf(modal)

		if (modalIndex > -1) {
			queueCopy.splice(modalIndex, 1)
		}

		if (userOnClose) {
			userOnClose()
		}

		if (modalQueueState.value.length !== queueCopy.length) {
			modalQueueState.value = [...queueCopy]
		}
	}

	let arr = modalQueueState.value

	arr.push(modal)

	modalQueueState.value = [...arr]
}

export const ModalLayer = () => {
	const theme = useTheme()
	const [modalQueue] = modalQueueState.use()
	const divRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const cb = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				modalQueueState.value = modalQueue.slice(1)
			}
		}
		window.addEventListener("keyup", cb)

		return () => window.removeEventListener("keyup", cb)
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		pages.EnableScroll(modalQueue.length === 0)
	}, [modalQueue.length])

	if (modalQueue.length === 0) {
		return null
	}

	const visible = modalQueue.length > 0

	return (
		<div
			className="modal-closable-area"
			ref={divRef}
			style={{
				background: visible ? "rgba(0,0,0, 0.75)" : "rgba(0,0,0,0)",
				transition: "background-color 150ms ease-in-out",
				position: "fixed",
				minWidth: "100%",
				minHeight: "100%",
				zIndex: 2000,
				display: "flex",
			}}
			onPointerDown={(e) => {
				const element = e.target as HTMLElement

				if (element.className !== "modal-closable-area") return
				const modal = modalQueue[modalQueue.length - 1]

				if (modal) {
					modal.props.onClose()
				}
			}}
		>
			<Clickable
				containerStyle={{
					position: "absolute",
					zIndex: 100,
					top: theme.sizes.S,
					right: theme.sizes.S,
				}}
				onClick={() => {
					const modal = modalQueue[modalQueue.length - 1]

					if (modal) {
						modal.props.onClose()
					}
				}}
			>
				<div
					style={{
						width: theme.sizes.XL,
						height: theme.sizes.XL,
						background: theme.colors.background,
						borderRadius: theme.borderSizes.circle,
					}}
				>
					<AbsolutePositionCenter>
						<Icon type="Close" />
					</AbsolutePositionCenter>
				</div>
			</Clickable>
			{modalQueue.map((_, i, arr) => {
				const modal = arr[-i + arr.length - 1]
				return (
					<div
						className="modal-closable-area"
						style={{
							position: "fixed",
							overflowY: "auto",
							width: "100vw",
							height: "100vh",
							display: "flex",
						}}
					>
						<div
							className="modal-closable-area"
							style={{
								transition: "all 500ms cubic-bezier(0.000, 0.975, 0.695, 0.675)",
								transform: "translateX(" + (-i + arr.length - 1) * 3 + "px)",
								margin: theme.sizes.M,
								width: "100%",
							}}
						>
							<modal.callback {...modal.props}></modal.callback>
							<Gutter size="M"></Gutter>
						</div>
					</div>
				)
			})}
		</div>
	)
}
