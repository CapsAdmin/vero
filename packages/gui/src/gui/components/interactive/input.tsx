import React, { ReactNode, useRef } from "react"
import { useTheme } from "@vero/gui-theme"
import { Text } from "@frontend/gui/typography"

export const Input = (
	props: React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement> & {
			onFocusChanged?: (focused: boolean) => void
			onTextChanged?: (text: string) => void
			onKeyPressed?: (key: string) => void
			onFinish?: (e: HTMLInputElement) => void
			onKeyScroll?: (dir: number) => boolean
			noAlignmentHacks?: boolean
			placeholder?: ReactNode
			area?: boolean
			inputRef?: React.RefObject<HTMLInputElement>
		},
		HTMLInputElement
	>,
) => {
	const changeFocus = (b: boolean) => {
		if (props.onFocusChanged) {
			props.onFocusChanged(b)
		}
	}
	const theme = useTheme()
	const ref = useRef<HTMLElement>()

	const textInputProps = { ...props }
	delete textInputProps.onKeyScroll
	delete textInputProps.onFinish
	delete textInputProps.onKeyPressed
	delete textInputProps.onTextChanged
	delete textInputProps.placeholder
	delete textInputProps.noAlignmentHacks
	delete textInputProps.inputRef

	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				alignItems: "center",
				flex: 1,
			}}
		>
			<Text
				className={props.className}
				element={props.area ? "textarea" : "input"}
				noAlignmentHacks={props.noAlignmentHacks}
				weak={props.disabled}
				style={{
					flex: 1,

					outline: "none",
					borderStyle: "none",
					background: "transparent",

					overflow: "hidden",

					userSelect: "initial",
					lineHeight: "unset",
					color: theme.colors.textForeground,
					width: 0,

					...props.style,
				}}
				props={
					{
						...{
							ref: (e) => {
								if (props.inputRef) {
									;(props.inputRef as any).current = e
								}
								if (e) {
									if (props.autoFocus && !ref.current) {
										setTimeout(() => {
											e.focus()
										}, 0)
									}

									ref.current = e
								}
							},
							onSubmit: (e) => {
								console.log("finish!")
								if (props.onFinish) {
									props.onFinish(e.currentTarget)
								}
							},
							onKeyDown: (e) => {
								if (e.key === "Enter") {
									if (props.onFinish) {
										props.onFinish(e.currentTarget)
									}
									// ref.current?.blur()
								}
								if (props.onKeyScroll) {
									if (e.key === "ArrowDown") {
										if (props.onKeyScroll(-1) === false) {
											e.preventDefault()
										}
									} else if (e.key === "ArrowUp") {
										if (props.onKeyScroll(1) === false) {
											e.preventDefault()
										}
									}
								}
								if (props.onKeyPressed) {
									props.onKeyPressed(e.key)
								}
							},
							onChange: (e) => (props.onTextChanged ? props.onTextChanged(e.target.value) : undefined),
							onFocus: () => changeFocus(true),
							onBlur: () => changeFocus(false),
							onGotPointerCapture: () => changeFocus(true),
							onLostPointerCapture: () => changeFocus(false),
						},
						...textInputProps,
					} as typeof props
				}
			/>
			<div
				style={{
					position: "absolute",
					pointerEvents: "none",
					...props.style,
				}}
			>
				{props.value !== "" ? null : <Text weak>{props.placeholder}</Text>}
			</div>
		</div>
	)
}
