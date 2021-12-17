import { Box } from "@frontend/gui/components/box"
import { Clickable } from "@frontend/gui/components/interactive/clickable"
import { Interactive } from "@frontend/gui/components/interactive/interactive"
import { Column } from "@frontend/gui/components/layout/row-column"
import { Line } from "@frontend/gui/components/line"
import { Showcase } from "@frontend/gui/showcase"
import { useTheme } from "@frontend/gui/theme"
import { Icon } from "@frontend/gui/themes/base"
import { Text } from "@frontend/gui/typography"
import { color_util } from "@frontend/other/colors"
import { ReleaseSound, WoshSound } from "@frontend/other/sounds"
import anime from "animejs"
import { CSSProperties, useEffect, useRef, useState } from "react"
import { Input } from "./input"

export const DropDown = (props: { data: string[]; titles?: string[]; selected: number; onSelect?: (val: any, i: number, data: any) => void }) => {
	interface Data {
		title: string
		value: any
	}
	const sortedData = useRef<Data[] | undefined>()

	let data: Data[]
	if (sortedData.current) {
		data = sortedData.current
	} else {
		data = []
		for (let i = 0; i < props.data.length; i++) {
			const value = props.data[i]
			const title = props.titles ? props.titles[i] : value.toString()
			data[i] = {
				title,
				value,
			}
		}
	}

	const [collapsed, setCollapsed] = useState(true)
	const [selected, setSelected] = useState(props.selected)
	useEffect(() => {
		setSelected(props.selected)

		if (!data[props.selected]) {
			console.error("DropDown: selected index out of bounds", props.selected, data)
		}

		setSearchText((data[props.selected] && data[props.selected].title) || "")
	}, [data, props.selected])
	let [hovered, setHovered] = useState(-1)
	const theme = useTheme()

	if (!data[selected]) {
		console.error("DropDown: selected index out of bounds", selected, data)
	}

	const [searchText, setSearchText] = useState((data[selected] && data[selected].title) || "")

	const editing = useRef(false)

	const padding = {
		// padding: theme.sizes.M,
		height: theme.sizes.XL,
		paddingLeft: theme.borderSizes.small,
		paddingRight: theme.sizes.L,
	}

	const restingHeight = padding.height

	if (!sortedData.current && editing.current && !collapsed && searchText !== data[selected].title) {
		data.sort((a, b) => {
			if (a.title === searchText) {
				return -1
			}

			if (a.title.indexOf(searchText) > -1) {
				return -1
			}

			if (a.title.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1) {
				return -1
			}

			return 1
		})
	}

	const select = (i: number) => {
		setSearchText(data[i].title || "")

		if (props.onSelect) {
			props.onSelect(data[i].value, i, data)
		}

		setSelected(i)

		setHovered(-1)
		ReleaseSound()
	}

	const renderItem = (i: number, border: CSSProperties, val: string) => {
		return (
			<Interactive
				key={i.toString()}
				refContainer={(e) => {
					if (!e) {
						return
					}
					if (i === hovered) {
						const top = e.offsetTop
						scroll.current?.scrollBy({ top })
					}
				}}
				onHover={(b) => {
					if (b) {
						setHovered(i)
					}
				}}
				onInteracted={() => {
					select(i)

					if (hovered > -1 && collapsed) {
						setCollapsed(true)
					}

					setHovered(-1)
				}}
				style={{
					background: i === hovered ? color_util.ModifyAlpha(theme.colors.primary, 0.2) : "transparent",
					...padding,
					touchAction: "none",

					...border,

					display: "flex",
					alignItems: "center",
				}}
			>
				{
					<Text strong={selected === i} style={{ textTransform: "capitalize", whiteSpace: "nowrap" }} color={"textForeground"}>
						{data[i].title}
					</Text>
				}
			</Interactive>
		)
	}

	const [width, setWidth] = useState(-1)
	const [reverse, setReverse] = useState(false)

	const scroll = useRef<HTMLDivElement | null>()
	const container2 = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (container2.current && !container2.current.contains(event.target as any) && (event.target as HTMLEmbedElement).className !== "drop-down" && !collapsed) {
			setSelected(selected)
			setSearchText(data[selected].title || "")
			setCollapsed(true)
			setHovered(-1)
			event.stopImmediatePropagation()
		}
	}

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true)

		return () => {
			document.removeEventListener("click", handleClickOutside, true)
		}
	})

	const containerRef2 = useRef<HTMLDivElement>(null)

	return (
		<Clickable
			containerStyle={{
				position: "relative",
				cursor: "pointer",
				height: restingHeight,
				width: "100%",
			}}
			containerRef={container2}
			className="drop-down"
			noSkew
			noBounce
			circleContainerRef={containerRef2}
			onClick={() => {
				const e = container2.current!
				if (e) {
					for (const e of document.getElementsByClassName("drop-down") as HTMLCollectionOf<HTMLDivElement>) {
						e.style.zIndex = "unset"
					}
					e.style.zIndex = "100"
				}
				setHovered(-1)

				setCollapsed(!collapsed)
				if (!collapsed) {
					setSelected(selected)
					setSearchText(data[selected].title || "")
				}
			}}
		>
			{!collapsed ? (
				<div
					ref={(e) => {
						if (!e) {
							return
						}
						e.style.width = width + "px"
						e.style.height = restingHeight + "px"

						// e.style.paddingBottom = (theme.sizes.M * 2) + "px"
					}}
					style={{
						minWidth: width,
					}}
				/>
			) : null}
			<div
				ref={(e) => {
					if (!e) {
						return
					}
					const w = e.clientWidth
					const h = e.clientHeight

					setWidth(w)
					setReverse(e.getBoundingClientRect().bottom + h * 2 > window.innerHeight)

					if (!collapsed) {
						e.style.position = "absolute"
						e.style.width = w + "px"
						// e.style.height = h + "px"

						e.style.top = 0 + "px"
						e.style.zIndex = "100"

						const e2 = containerRef2.current
						const e3 = scroll.current
						if (e2 && e3) {
							e2.style.transition = "height 500s ease-in-out"
							;(e2 as any).prevHeight = h
							e2.style.height = (e3 as any).realHeight + h + "px"
						}
					} else {
						e.style.zIndex = "unset"
						e.style.top = "unset"
						e.style.position = "unset"
						e.style.width = "unset"
						e.style.height = "unset"

						const e2 = containerRef2.current

						if (e2) {
							e2.style.height = "unset"
						}
					}
				}}
			>
				<Box
					color="textBackground"
					padding="none"
					style={{
						position: "relative",
						padding: 0,
						border: theme.sizes.line * 2 + "px solid " + theme.colors.urlForeground,
						boxShadow: "none",
					}}
				>
					<Column itemPadding="none" columnAlign="center">
						<div
							style={{
								background: "transparent",
								...padding,

								borderRadius: theme.borderSizes.small,

								display: "flex",
								alignItems: "center",

								flex: 1,
							}}
						>
							<Input
								style={{
									cursor: "pointer",
									height: restingHeight,
									textTransform: "capitalize",
								}}
								value={searchText}
								color={"textForeground"}
								noAlignmentHacks
								/*onFocusChanged={(b) => {
                                if (!b) {
                                    setTimeout(() => {
                                        setCollapsed(true)
                                    }, 100);
                                }
                            }}*/

								onFocus={(e) => {
									e.currentTarget.blur()
								}}
								onKeyScroll={(dir) => {
									hovered = hovered - dir

									if (hovered < -1) {
										hovered = data.length - 1
									} else if (hovered >= data.length) {
										hovered = -1
									}

									sortedData.current = data
									editing.current = false

									setHovered(hovered)
									setCollapsed(false)

									if (hovered >= 0) {
										setSearchText(data[hovered].title)
									}

									return false
								}}
								onFinish={() => {
									if (collapsed) {
										return
									}
									select(Math.max(hovered, 0))
								}}
								onKeyPressed={(key) => {
									if (key === "Enter" && collapsed) {
										setCollapsed(false)
									}
								}}
								onTextChanged={(str) => {
									setCollapsed(false)
									setSearchText(str)
									setHovered(-1)

									sortedData.current = undefined
									editing.current = true
								}}
							></Input>
						</div>
					</Column>

					<div
						ref={(e) => {
							if (!e) {
								return
							}

							if (!collapsed) {
								scroll.current = e
							} else {
								scroll.current = null
							}

							const env = e as any

							env.realHeight = env.realHeight || e.clientHeight
							env.realWidth = env.realWidth || e.clientWidth

							if (env.lastCollapsed === undefined) {
								env.lastCollapsed = collapsed
								e.style.height = "0px"
							} else if (env.lastCollapsed !== collapsed) {
								const didSelect = env.lastSelected !== selected

								anime({
									delay: didSelect ? 250 / 2 : 0,
									duration: 500,
									targets: e,
									height: [
										{
											value: collapsed ? env.realHeight : 0,
											duration: 0,
										},
										{
											value: collapsed ? 0 : env.realHeight,
										},
									],
									easing: !collapsed ? "easeOutCirc" : "easeOutCirc",
								})
								WoshSound(collapsed)

								env.lastSelected = selected
								env.lastCollapsed = collapsed
							}
						}}
						style={{
							overflowY: "hidden",
							maxHeight: 500,
						}}
					>
						<div
							style={{ transformOrigin: "50% 50%" }}
							ref={(e) => {
								if (!e) {
									return
								}
								const env = e as any

								if (env.lastCollapsed !== collapsed) {
									anime({
										delay: !collapsed ? 250 / 2 : 0,
										duration: 250,
										targets: e,
										scaleX: [{ value: collapsed ? 1 : 0 }, { value: collapsed ? 0 : 1 }],
										easing: "easeOutCirc",
									})

									env.lastCollapsed = collapsed
								}
							}}
						>
							<Line></Line>
						</div>
						<Column itemPadding="none" columnAlign="center">
							{data.map((val, i) => {
								let border: CSSProperties = {}

								if (collapsed) {
									border = {
										borderRadius: theme.borderSizes.small,
									}
								} else if (i === -1) {
									border = {
										borderTopLeftRadius: theme.borderSizes.small,
										borderTopRightRadius: theme.borderSizes.small,
									}
								} else if (i === props.data.length - 1) {
									border = {
										borderBottomLeftRadius: theme.borderSizes.small,
										borderBottomRightRadius: theme.borderSizes.small,
									}
								}

								return renderItem(i, border, val.title)
							})}
						</Column>
					</div>

					<Icon
						type="TriangleDown"
						color="urlForeground"
						size="IconSmall"
						style={{
							position: "absolute",
							right: theme.sizes.S,
							top: restingHeight / 2,
							transform: "translateY(-50%) scaleY(" + (reverse ? -1 : 1) + ")",
							transition: "opacity 0.125s ease-in-out",
						}}
					/>
				</Box>
			</div>
		</Clickable>
	)
}

Showcase("drop down", () => {
	const [res, setRes] = useState("one")
	return (
		<Column>
			<Text>{res}</Text>
			<DropDown
				data={["1", "2", "3"]}
				titles={["one", "two", "three"]}
				selected={0}
				onSelect={(val) => {
					setRes(val)
				}}
			/>

			<div style={{ background: "yellow" }}>
				<DropDown
					data={["1", "2", "3"]}
					titles={["one", "two", "three"]}
					selected={0}
					onSelect={(val) => {
						setRes(val)
					}}
				/>
			</div>
		</Column>
	)
})
