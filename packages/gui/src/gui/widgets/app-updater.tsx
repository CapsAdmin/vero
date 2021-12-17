import React, { useEffect, useState } from "react"
import { register } from "@frontend/serviceWorkerRegistration"

export const AppUpdater = () => {
	const [showReload, setShowReload] = useState(false)
	const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
	const [formRef, setFormRef] = useState<HTMLFormElement | null>(null)

	useEffect(() => {
		register({
			onUpdate: (registration) => {
				setShowReload(true)
				setWaitingWorker(registration.waiting)
			},
		})
	}, [])

	if (!showReload) {
		return null
	}

	return (
		<div
			style={{
				position: "absolute",
				background: "white",
				left: "50%",
				transform: "translateX(-50%)",
				width: "200px",
				textAlign: "center",
				border: "5px solid orange",
				borderRadius: 20,
				padding: 10,
				zIndex: 10000,
			}}
		>
			<form ref={(ref) => setFormRef(ref)}></form>
			<strong>
				<span style={{ color: "orange", padding: 10 }}>new update available!</span>
			</strong>
			<button
				style={{
					marginTop: 10,
				}}
				onClick={() => {
					waitingWorker?.postMessage({ type: "SKIP_WAITING" })
					setShowReload(false)
					let location = window.location.href
					//window.location.reload(true)
					formRef?.submit()
					window.location.href = location
				}}
			>
				update
			</button>
		</div>
	)
}
