import { chroma } from "@frontend/app/thirdparty"
import SVGBackground from "@frontend/assets/images/background.svg"
import { Showcase } from "@frontend/gui/showcase"
import { BorderSizes, BuildShadow, ThemeColor, ThemeSizes, useTheme } from "@frontend/gui/theme"
import { color_util } from "@frontend/other/colors"
import { InjectCSS } from "@frontend/other/css"
import React, { CSSProperties, ReactElement, ReactNode, useEffect, useState } from "react"
import { FaArrowRight, FaCaretDown, FaCheck, FaEdit, FaEye, FaEyeSlash, FaGlobe } from "react-icons/fa"
import { Gi3DHammer, GiCaravan, GiCharm, GiDutchBike, GiHouse, GiTeamIdea, GiTiedScroll, GiTruck, GiWatch } from "react-icons/gi"
import { GoChevronUp } from "react-icons/go"
import { IoMdClose } from "react-icons/io"
import { SetupFontFace } from "../typography"
export interface IconProps {
	style?: CSSProperties
	size?: string | number
	color?: string
}

const loadSVG = (render: (color: string) => ReactElement) => {
	return (props: IconProps) => {
		const theme = useTheme()
		const size = props.size || theme.sizes.XXL

		return (
			<div
				style={{
					width: size || 42,
					height: size || 42,
					minWidth: size || 42,
					minHeight: size || 42,
					display: "inline-block",
					...theme.iconStyle,
					...props.style,
				}}
			>
				{render(props.color || theme.colors.textForeground)}
			</div>
		)
	}
}

const Person = loadSVG((color) => (
	<svg viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M11.1622 11.0969C10.1426 11.0969 9.68559 11.6594 8.03325 11.6594C6.34575 11.6594 5.88872 11.0969 4.86919 11.0969C2.26763 11.0969 0.158251 13.2415 0.158251 15.843V17.2844C0.158251 18.2336 0.896532 18.9719 1.84575 18.9719H14.2208C15.1348 18.9719 15.9083 18.2336 15.9083 17.2844V15.843C15.9083 13.2415 13.7637 11.0969 11.1622 11.0969ZM14.7833 17.2844C14.7833 17.6008 14.502 17.8469 14.2208 17.8469H1.84575C1.52934 17.8469 1.28325 17.6008 1.28325 17.2844V15.843C1.28325 13.8391 2.86528 12.2219 4.86919 12.2219C5.57231 12.2219 6.24028 12.7844 8.03325 12.7844C9.79106 12.7844 10.4942 12.2219 11.1622 12.2219C13.1661 12.2219 14.7833 13.8391 14.7833 15.843V17.2844ZM8.03325 9.97192C10.4942 9.97192 12.5333 7.96802 12.5333 5.47192C12.5333 3.01099 10.4942 0.971924 8.03325 0.971924C5.53716 0.971924 3.53325 3.01099 3.53325 5.47192C3.53325 7.96802 5.53716 9.97192 8.03325 9.97192ZM8.03325 2.09692C9.86138 2.09692 11.4083 3.6438 11.4083 5.47192C11.4083 7.33521 9.86138 8.84692 8.03325 8.84692C6.16997 8.84692 4.65825 7.33521 4.65825 5.47192C4.65825 3.6438 6.16997 2.09692 8.03325 2.09692Z"
			fill={color}
		/>
	</svg>
))

const NoAvatar = loadSVG((color) => (
	<svg viewBox="0 0 110 110">
		<path
			fill={color}
			d="M67.06,85a29.79,29.79,0,0,1-1.63-4.61c4.38-.44,7.85-1.15,8.57-1.68,2-1.46,3.63-28.77,3-32.69-.39-2.63-.57-11.78-.46-18.41l19.07-6.27c.29-1.49.4-.91-.47-2.27l-18-.32S74.35,6.59,70.33,1.56c-6.23-4-34.65.13-41.81,7.57-6.71,7-5.11,23.41-5.11,23.41h.07A127.34,127.34,0,0,0,24.7,46.16c.88,6,3.65,12.34,7.86,18.59,1.29,9,1.08,19.65-4.53,23.61h0c-10,4.79-19.36,13.46-28,28a66.89,66.89,0,0,0,56.05,28c24.84-.39,40.84-12.49,51-23.54C95.75,98.82,81.81,88.71,67.06,85Z"
		/>
	</svg>
))

const DriverPerson = loadSVG((color) => (
	<svg width="15" height="51" viewBox="0 0 15 51" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fill={color}
			d="M2.8125 33.8348C1.20785 33.5094 0 32.0918 0 30.3924V18.4494C0 15.992 1.99372 14 4.45314 14H10.5469C13.0063 14 15 15.992 15 18.4494V30.3924C15 32.0918 13.7921 33.5094 12.1875 33.8348V47.4873C12.1875 49.4273 10.6135 51 8.67188 51H6.32812C4.38648 51 2.8125 49.4273 2.8125 47.4873V33.8348Z"
		/>
		<path
			fill={color}
			d="M5.64257 11.0883C7.16257 12.5583 8.1911 12.9572 10.3939 13C11.0578 12.9288 11.5836 12.814 11.6928 12.7283C11.9959 12.4922 12.2429 8.0757 12.1474 7.44176C12.0884 7.01645 12.0611 5.53671 12.0778 4.46452L14.968 3.45056C15.012 3.20964 15.0287 3.3034 14.8968 3.08347L12.1687 3.03172C12.1687 3.03172 11.7458 1.06525 11.1365 0.251803C10.1923 -0.395076 5.88495 0.272802 4.79973 1.47598C3.78279 2.60805 4.02528 5.2618 4.02528 5.2618H4.03587C4.0605 5.99903 4.1222 6.73427 4.22081 7.46441C4.35416 8.43473 5.00451 10.0776 5.64257 11.0883Z"
		/>
	</svg>
))

const LoadingSpinner = (props: IconProps) => {
	InjectCSS(`
	.lds-ellipsis {
		transform: scale(0.35) translate(-27px, -37px);
		height: 5px;
		width: 22px;
	}
	  .lds-ellipsis div {
		position: absolute;
		top: 33px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	  }
	  .lds-ellipsis div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	  }
	  .lds-ellipsis div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	  }
	  .lds-ellipsis div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	  }
	  .lds-ellipsis div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	  }
	  @keyframes lds-ellipsis1 {
		0% {
		  transform: scale(0);
		}
		100% {
		  transform: scale(1);
		}
	  }
	  @keyframes lds-ellipsis3 {
		0% {
		  transform: scale(1);
		}
		100% {
		  transform: scale(0);
		}
	  }
	  @keyframes lds-ellipsis2 {
		0% {
		  transform: translate(0, 0);
		}
		100% {
		  transform: translate(24px, 0);
		}
	  }
	`)

	const theme = useTheme()
	const color = props.color || theme.colors.textForeground
	return (
		<div className="lds-ellipsis">
			<div style={{ background: color }} />
			<div style={{ background: color }} />
			<div style={{ background: color }} />
			<div style={{ background: color }} />
		</div>
	)
}

const TriangleUp = loadSVG((color) => (
	<svg viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M7.18336 0.506592C7.56826 -0.160075 8.53051 -0.160075 8.91541 0.506592L15.225 11.4352C15.6099 12.1018 15.1288 12.9352 14.359 12.9352H1.73977C0.969973 12.9352 0.488847 12.1018 0.873747 11.4352L7.18336 0.506592Z"
			fill={color}
		/>
	</svg>
))

const Filter = loadSVG((color) => {
	return (
		<svg viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M26.8872 0.666992H2.44189C0.855957 0.666992 0.090332 2.58105 1.18408 3.6748L11.1919 13.6826V23.8545V23.9092C11.1919 24.3467 11.4106 24.8936 11.7388 25.2217L15.2388 28.2842C16.3872 29.2139 18.1919 28.4482 18.1919 26.917V13.6826L28.145 3.6748C29.2388 2.58105 28.4731 0.666992 26.8872 0.666992ZM16.4419 12.917V26.917L12.9419 23.8545V12.917L2.44189 2.41699H26.9419L16.4419 12.917Z"
				fill={color}
			/>
		</svg>
	)
})

export type IconType = ReturnType<typeof TriangleUp>
Showcase("icons", () => {
	const theme = useTheme()
	const arr = []
	const icons = [Gi3DHammer, GiCharm, GiHouse, GiTeamIdea, GiTiedScroll, GiWatch, GiCaravan, GiTruck, GiDutchBike]

	for (const icon of Object.values(theme.icons)) {
		icons.push(icon)
	}

	for (const Icon of icons) {
		arr.push(
			<div
				style={{
					position: "relative",
					borderColor: theme.colors.textForeground,
					borderStyle: "solid",
					borderWidth: "1px",
				}}
			>
				<Icon size={64} color={theme.colors.textForeground} />
				<div
					style={{
						position: "absolute",
						top: "50%",
						width: "100%",
						height: "2px",
						background: "rgba(255,255,0,0.85)",
					}}
				></div>
			</div>,
		)
	}

	return <div style={{ display: "flex", flexWrap: "wrap" }}>{arr}</div>
})

const ExternalLink = loadSVG((color) => (
	<svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M17.4727 0.960449L11.7422 0.995605C11.4609 0.995605 11.25 1.20654 11.25 1.48779V2.64795C11.25 2.9292 11.4609 3.17529 11.7422 3.17529L14.3438 3.06982L14.4141 3.14014L4.60547 12.9487C4.53516 13.019 4.46484 13.1597 4.46484 13.23C4.46484 13.3354 4.53516 13.4761 4.60547 13.5464L5.41406 14.355C5.48438 14.4253 5.625 14.4956 5.73047 14.4956C5.80078 14.4956 5.94141 14.4253 6.01172 14.355L15.8203 4.54639L15.8906 4.6167L15.7852 7.21826C15.7852 7.49951 16.0312 7.71045 16.3125 7.71045H17.4727C17.7539 7.71045 17.9648 7.49951 17.9648 7.21826L18 1.48779C18 1.20654 17.7539 0.960449 17.4727 0.960449ZM15.1875 11.0854H14.625C14.3086 11.0854 14.0625 11.3667 14.0625 11.6479V17.062C14.0625 17.2026 13.957 17.2729 13.8516 17.2729H1.89844C1.75781 17.2729 1.6875 17.2026 1.6875 17.062V5.10889C1.6875 5.00342 1.75781 4.89795 1.89844 4.89795H7.3125C7.59375 4.89795 7.875 4.65186 7.875 4.33545V3.77295C7.875 3.4917 7.59375 3.21045 7.3125 3.21045H1.6875C0.738281 3.21045 0 3.98389 0 4.89795V17.2729C0 18.2222 0.738281 18.9604 1.6875 18.9604H14.0625C14.9766 18.9604 15.75 18.2222 15.75 17.2729V11.6479C15.75 11.3667 15.4688 11.0854 15.1875 11.0854Z"
			fill={color}
		/>
	</svg>
))

const sizes = {
	none: 0,
	line: 1,
	XXXS: 2,
	XXS: 4,
	XS: 8,
	S: 12,
	M: 24,
	L: 32,
	XL: 48,
	XXL: 96,
}

const colors = color_util.BuildPallete(["hsl(0, 0%, 100%)", "hsl(0, 0%, 23%)"], {
	red: "#fc674c",
	yellow: "#F1A74C",
	green: "#60B777",
	blue: "#216DB4",
	purple: "#9f60c2",
	brown: "#a17247",
})

const shadow = BuildShadow([
	{
		x: 2,
		y: 2,
		blur: 1,
		radius: 1,
		color: color_util.ModifyAlpha(colors.black, 0.1),
	},
	{
		x: 2,
		y: 2,
		blur: 10,
		radius: 5,
		color: color_util.ModifyAlpha(colors.darker, 0.05),
	},
])

const shadowFooter = BuildShadow([
	{
		x: 2,
		y: -2,
		blur: 1,
		radius: 1,
		color: color_util.ModifyAlpha(colors.black, 0.1),
	},
	{
		x: 2,
		y: -2,
		blur: 10,
		radius: 5,
		color: color_util.ModifyAlpha(colors.darker, 0.05),
	},
])

const PNG = (promise: Promise<{ default: string }>) => {
	return (props: IconProps) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [image, setImage] = useState<string>()

		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			let unmounted = false

			promise.then((blob) => {
				if (unmounted) return
				setImage(blob.default)
			})

			return () => {
				unmounted = true
			}
		}, [setImage])

		const dimensions = typeof props.size == "string" ? parseFloat(props.size) : props.size || 16

		if (props.color) {
			let [r, g, b] = chroma(props.color).rgb()
			let id = "color" + r + "_" + g + "_" + b

			return (
				<svg width={props.size} height={props.size} style={props.style}>
					<filter id={id}>
						<feColorMatrix
							type="matrix"
							values={`
								${r / 255} 0 0 0 0
								0 ${g / 255} 0 0 0 
								0 0 ${b / 255} 0 0 
								0 0 0 1 0
							`}
						/>
					</filter>

					<image
						style={{
							width: props.size,
							height: props.size,
						}}
						filter={"url(#" + id + ")"}
						//preserveAspectRatio="xMinYMin slice"
						xlinkHref={image}
					/>
				</svg>
			)
		}

		return (
			<img
				style={{
					width: dimensions,
					height: dimensions,
					minWidth: dimensions,
					minHeight: dimensions,
					imageRendering: "crisp-edges",
					display: "block",
					...props.style,
				}}
				aria-label={"icon"}
				src={image}
			></img>
		)
	}
}

const icons = {
	LoadingSpinner,
	TriangleUp,
	NoAvatar,
	Person,
	DriverPerson,
	Filter,
	TriangleDown: FaCaretDown,
	ExternalLink,
	Settings: PNG(import("@frontend/assets/icons/Size=24, Icon=Settings.png")),
	Right: FaArrowRight,
	Close: IoMdClose,
	ChevronUp: GoChevronUp,
	CheckMark: FaCheck,
	Edit: FaEdit,
	ShowPassword: FaEye,
	HidePassword: FaEyeSlash,
	Error: PNG(import("@frontend/assets/icons/Size=24, Icon=Error.png")),
	Language: FaGlobe,
	Loading: LoadingSpinner,
	Home24: PNG(import("@frontend/assets/icons/Size=24, Icon=Home.png")),
	Home32: PNG(import("@frontend/assets/icons/Size=32, Icon=Home.png")),
	Home64: PNG(import("@frontend/assets/icons/Size=64, Icon=Home.png")),
	Deviation16: PNG(import("@frontend/assets/icons/Size=16, Icon=Deviation.png")),
	DriverPoints16: PNG(import("@frontend/assets/icons/Size=16, Icon=DriverPoints.png")),
	Accuracy24: PNG(import("@frontend/assets/icons/Size=24, Icon=Accuracy.png")),
	Driver24: PNG(import("@frontend/assets/icons/Size=24, Icon=Driver.png")),
	PerDriver24: PNG(import("@frontend/assets/icons/Size=24, Icon=PerDriver.png")),
	PerDay24: PNG(import("@frontend/assets/icons/Size=24, Icon=PerDay.png")),
	PerDriverPerDay24: PNG(import("@frontend/assets/icons/Size=24, Icon=PerDriverPerDay.png")),
	Bring24: PNG(import("@frontend/assets/icons/Size=24, Icon=Bring.png")),
	Calendar24: PNG(import("@frontend/assets/icons/Size=24, Icon=Calendar.png")),
	Checkmark24: PNG(import("@frontend/assets/icons/Size=24, Icon=Checkmark.png")),
	Comment24: PNG(import("@frontend/assets/icons/Size=24, Icon=Comment.png")),
	CubicMeter24: PNG(import("@frontend/assets/icons/Size=24, Icon=CubicMeter.png")),
	Default24: PNG(import("@frontend/assets/icons/Size=24, Icon=Default.png")),
	Delivery24: PNG(import("@frontend/assets/icons/Size=24, Icon=Delivery.png")),
	Deviation24: PNG(import("@frontend/assets/icons/Size=24, Icon=Deviation.png")),
	Dice24: PNG(import("@frontend/assets/icons/Size=24, Icon=Dice.png")),
	DriverPoints24: PNG(import("@frontend/assets/icons/Size=24, Icon=DriverPoints.png")),
	ExpectedPlace24: PNG(import("@frontend/assets/icons/Size=24, Icon=ExpectedPlace.png")),
	FuriousDriver24: PNG(import("@frontend/assets/icons/Size=24, Icon=FuriousDriver.png")),
	Ghost24: PNG(import("@frontend/assets/icons/Size=24, Icon=Ghost.png")),
	GhostMansion24: PNG(import("@frontend/assets/icons/Size=24, Icon=GhostMansion.png")),
	Globe24: PNG(import("@frontend/assets/icons/Size=24, Icon=Globe.png")),
	HelpedOthers24: PNG(import("@frontend/assets/icons/Size=24, Icon=HelpedOthers.png")),
	Innafor24: PNG(import("@frontend/assets/icons/Size=24, Icon=Innafor.png")),
	King24: PNG(import("@frontend/assets/icons/Size=24, Icon=King.png")),
	MissedTarget24: PNG(import("@frontend/assets/icons/Size=24, Icon=MissedTarget.png")),
	MysteryPackage24: PNG(import("@frontend/assets/icons/Size=24, Icon=MysteryPackage.png")),
	NPS24: PNG(import("@frontend/assets/icons/Size=24, Icon=NPS.png")),
	NoDeliveryEvent24: PNG(import("@frontend/assets/icons/Size=24, Icon=NoDeliveryEvent.png")),
	NoNotification24: PNG(import("@frontend/assets/icons/Size=24, Icon=NoNotification.png")),
	Notification24: PNG(import("@frontend/assets/icons/Size=24, Icon=Notification.png")),
	OutOfTime24: PNG(import("@frontend/assets/icons/Size=24, Icon=OutOfTime.png")),
	Overligg24: PNG(import("@frontend/assets/icons/Size=24, Icon=Overligg.png")),
	PackagesPerHour24: PNG(import("@frontend/assets/icons/Size=24, Icon=PackagesPerHour.png")),
	Package16: PNG(import("@frontend/assets/icons/Size=16, Icon=Package.png")),
	Package24: PNG(import("@frontend/assets/icons/Size=24, Icon=Package.png")),
	Posten24: PNG(import("@frontend/assets/icons/Size=24, Icon=Posten.png")),
	Productivity24: PNG(import("@frontend/assets/icons/Size=24, Icon=Productivity.png")),
	Quality24: PNG(import("@frontend/assets/icons/Size=24, Icon=Quality.png")),
	RightChevron24: PNG(import("@frontend/assets/icons/Size=24, Icon=RightChevron.png")),
	Running24: PNG(import("@frontend/assets/icons/Size=24, Icon=Running.png")),
	Service24: PNG(import("@frontend/assets/icons/Size=24, Icon=Service.png")),
	Time24: PNG(import("@frontend/assets/icons/Size=24, Icon=Time.png")),
	Trophy24: PNG(import("@frontend/assets/icons/Size=24, Icon=Trophy.png")),
	Upload24: PNG(import("@frontend/assets/icons/Size=24, Icon=Upload.png")),
	Van24: PNG(import("@frontend/assets/icons/Size=24, Icon=Van.png")),
	VanFlipped24: PNG(import("@frontend/assets/icons/Size=24, Icon=VanFlipped.png")),
	Warrior24: PNG(import("@frontend/assets/icons/Size=24, Icon=Warrior.png")),
	Weight24: PNG(import("@frontend/assets/icons/Size=24, Icon=Weight.png")),
	Accuracy32: PNG(import("@frontend/assets/icons/Size=32, Icon=Accuracy.png")),
	Bring32: PNG(import("@frontend/assets/icons/Size=32, Icon=Bring.png")),
	Calendar32: PNG(import("@frontend/assets/icons/Size=32, Icon=Calendar.png")),
	Comment32: PNG(import("@frontend/assets/icons/Size=32, Icon=Comment.png")),
	CubicMeter32: PNG(import("@frontend/assets/icons/Size=32, Icon=CubicMeter.png")),
	Default32: PNG(import("@frontend/assets/icons/Size=32, Icon=Default.png")),
	Delivery32: PNG(import("@frontend/assets/icons/Size=32, Icon=Delivery.png")),
	Deviation32: PNG(import("@frontend/assets/icons/Size=32, Icon=Deviation.png")),
	Dice32: PNG(import("@frontend/assets/icons/Size=32, Icon=Dice.png")),
	DriverPoints32: PNG(import("@frontend/assets/icons/Size=32, Icon=DriverPoints.png")),
	ExpectedPlace32: PNG(import("@frontend/assets/icons/Size=32, Icon=ExpectedPlace.png")),
	FuriousDriver32: PNG(import("@frontend/assets/icons/Size=32, Icon=FuriousDriver.png")),
	Ghost32: PNG(import("@frontend/assets/icons/Size=32, Icon=Ghost.png")),
	GhostMansion32: PNG(import("@frontend/assets/icons/Size=32, Icon=GhostMansion.png")),
	Globe32: PNG(import("@frontend/assets/icons/Size=32, Icon=Globe.png")),
	HelpedOthers32: PNG(import("@frontend/assets/icons/Size=32, Icon=HelpedOthers.png")),
	Innafor32: PNG(import("@frontend/assets/icons/Size=32, Icon=Innafor.png")),
	King32: PNG(import("@frontend/assets/icons/Size=32, Icon=King.png")),
	MissedTarget32: PNG(import("@frontend/assets/icons/Size=32, Icon=MissedTarget.png")),
	MysteryPackage32: PNG(import("@frontend/assets/icons/Size=32, Icon=MysteryPackage.png")),
	NPS32: PNG(import("@frontend/assets/icons/Size=32, Icon=NPS.png")),
	NoDeliveryEvent32: PNG(import("@frontend/assets/icons/Size=32, Icon=NoDeliveryEvent.png")),
	NoNotification32: PNG(import("@frontend/assets/icons/Size=32, Icon=NoNotification.png")),
	Notification32: PNG(import("@frontend/assets/icons/Size=32, Icon=Notification.png")),
	OutOfTime32: PNG(import("@frontend/assets/icons/Size=32, Icon=OutOfTime.png")),
	Overligg32: PNG(import("@frontend/assets/icons/Size=32, Icon=Overligg.png")),
	PackagesPerHour32: PNG(import("@frontend/assets/icons/Size=32, Icon=PackagesPerHour.png")),
	Package32: PNG(import("@frontend/assets/icons/Size=32, Icon=Package.png")),
	Posten32: PNG(import("@frontend/assets/icons/Size=32, Icon=Posten.png")),
	Productivity32: PNG(import("@frontend/assets/icons/Size=32, Icon=Productivity.png")),
	Quality32: PNG(import("@frontend/assets/icons/Size=32, Icon=Quality.png")),
	RightChevron32: PNG(import("@frontend/assets/icons/Size=32, Icon=RightChevron.png")),
	Running32: PNG(import("@frontend/assets/icons/Size=32, Icon=Running.png")),
	Service32: PNG(import("@frontend/assets/icons/Size=32, Icon=Service.png")),
	Time32: PNG(import("@frontend/assets/icons/Size=32, Icon=Time.png")),
	Trophy32: PNG(import("@frontend/assets/icons/Size=32, Icon=Trophy.png")),
	Upload32: PNG(import("@frontend/assets/icons/Size=32, Icon=Upload.png")),
	Van32: PNG(import("@frontend/assets/icons/Size=32, Icon=Van.png")),
	VanFlipped32: PNG(import("@frontend/assets/icons/Size=32, Icon=VanFlipped.png")),
	Warrior32: PNG(import("@frontend/assets/icons/Size=32, Icon=Warrior.png")),
	Weight32: PNG(import("@frontend/assets/icons/Size=32, Icon=Weight.png")),
	Accuracy64: PNG(import("@frontend/assets/icons/Size=64, Icon=Accuracy.png")),
	Bring64: PNG(import("@frontend/assets/icons/Size=64, Icon=Bring.png")),
	Calendar64: PNG(import("@frontend/assets/icons/Size=64, Icon=Calendar.png")),
	Comment64: PNG(import("@frontend/assets/icons/Size=64, Icon=Comment.png")),
	CubicMeter64: PNG(import("@frontend/assets/icons/Size=64, Icon=CubicMeter.png")),
	Default64: PNG(import("@frontend/assets/icons/Size=64, Icon=Default.png")),
	Delivery64: PNG(import("@frontend/assets/icons/Size=64, Icon=Delivery.png")),
	Deviation64: PNG(import("@frontend/assets/icons/Size=64, Icon=Deviation.png")),
	Dice64: PNG(import("@frontend/assets/icons/Size=64, Icon=Dice.png")),
	DriverPoints64: PNG(import("@frontend/assets/icons/Size=64, Icon=DriverPoints.png")),
	ExpectedPlace64: PNG(import("@frontend/assets/icons/Size=64, Icon=ExpectedPlace.png")),
	FuriousDriver64: PNG(import("@frontend/assets/icons/Size=64, Icon=FuriousDriver.png")),
	Ghost64: PNG(import("@frontend/assets/icons/Size=64, Icon=Ghost.png")),
	GhostMansion64: PNG(import("@frontend/assets/icons/Size=64, Icon=GhostMansion.png")),
	Globe64: PNG(import("@frontend/assets/icons/Size=64, Icon=Globe.png")),
	HelpedOthers64: PNG(import("@frontend/assets/icons/Size=64, Icon=HelpedOthers.png")),
	Innafor64: PNG(import("@frontend/assets/icons/Size=64, Icon=Innafor.png")),
	King64: PNG(import("@frontend/assets/icons/Size=64, Icon=King.png")),
	MissedTarget64: PNG(import("@frontend/assets/icons/Size=64, Icon=MissedTarget.png")),
	MysteryPackage64: PNG(import("@frontend/assets/icons/Size=64, Icon=MysteryPackage.png")),
	NPS64: PNG(import("@frontend/assets/icons/Size=64, Icon=NPS.png")),
	NoDeliveryEvent64: PNG(import("@frontend/assets/icons/Size=64, Icon=NoDeliveryEvent.png")),
	NoNotification64: PNG(import("@frontend/assets/icons/Size=64, Icon=NoNotification.png")),
	Notification64: PNG(import("@frontend/assets/icons/Size=64, Icon=Notification.png")),
	OutOfTime64: PNG(import("@frontend/assets/icons/Size=64, Icon=OutOfTime.png")),
	Overligg64: PNG(import("@frontend/assets/icons/Size=64, Icon=Overligg.png")),
	PackagesPerHour64: PNG(import("@frontend/assets/icons/Size=64, Icon=PackagesPerHour.png")),
	Package64: PNG(import("@frontend/assets/icons/Size=64, Icon=Package.png")),
	Posten64: PNG(import("@frontend/assets/icons/Size=64, Icon=Posten.png")),
	Productivity64: PNG(import("@frontend/assets/icons/Size=64, Icon=Productivity.png")),
	Quality64: PNG(import("@frontend/assets/icons/Size=64, Icon=Quality.png")),
	RightChevron64: PNG(import("@frontend/assets/icons/Size=64, Icon=RightChevron.png")),
	Running64: PNG(import("@frontend/assets/icons/Size=64, Icon=Running.png")),
	Service64: PNG(import("@frontend/assets/icons/Size=64, Icon=Service.png")),
	Time64: PNG(import("@frontend/assets/icons/Size=64, Icon=Time.png")),
	Trophy64: PNG(import("@frontend/assets/icons/Size=64, Icon=Trophy.png")),
	Upload64: PNG(import("@frontend/assets/icons/Size=64, Icon=Upload.png")),
	Van64: PNG(import("@frontend/assets/icons/Size=64, Icon=Van.png")),
	VanFlipped64: PNG(import("@frontend/assets/icons/Size=64, Icon=VanFlipped.png")),
	Warrior64: PNG(import("@frontend/assets/icons/Size=64, Icon=Warrior.png")),
	Weight64: PNG(import("@frontend/assets/icons/Size=64, Icon=Weight.png")),

	Conduct64: PNG(import("@frontend/assets/icons/Size=64, Icon=Conduct.png")),
	Conduct32: PNG(import("@frontend/assets/icons/Size=32, Icon=Conduct.png")),
	Conduct24: PNG(import("@frontend/assets/icons/Size=24, Icon=Conduct.png")),

	FirstPlace64: PNG(import("@frontend/assets/icons/Size=64, Icon=1Gold.png")),
	SecondPlace64: PNG(import("@frontend/assets/icons/Size=64, Icon=2Silver.png")),
	ThirdPlace64: PNG(import("@frontend/assets/icons/Size=64, Icon=3Bronze.png")),

	ThumbsUp24: PNG(import("@frontend/assets/icons/Size=24, Icon=ThumbsUp.png")),
	ThumbsDown24: PNG(import("@frontend/assets/icons/Size=24, Icon=ThumbsDown.png")),
}

export class BaseTheme {
	fonts = SetupFontFace({
		heading: import("@frontend/assets/fonts/ChangaOne-Regular.ttf"),
		"body-weak": import("@frontend/assets/fonts/PostenSans-Light.ttf"),
		body: import("@frontend/assets/fonts/PostenSans-Regular.ttf"),
		"body-medium": import("@frontend/assets/fonts/PostenSans-Bold.ttf"),
		"body-strong": import("@frontend/assets/fonts/PostenSans-Bold.ttf"),
		monospace: import("@frontend/assets/fonts/FoundryMonolinePN-Light.ttf"),
	})
	textSizes = {
		XS: 12,
		S: 14,
		M: 16,
		L: 18,
		XL: 20,
		XXL: 32,
		XXXL: 42,
	}

	iconStyle = {}

	strokeWidth = sizes.line
	strokeWidthThick = sizes.line * 2
	sizes = {
		default: sizes.M,
		IconTiny: 16,
		IconSmall: 24,
		IconMedium: 32,
		IconLarge: 64,
		...sizes,
	}
	lineStyle = {
		Render: (props: { strong: boolean; horizontal: boolean; color: string }) => {
			const theme = useTheme()
			const thickness = props.strong ? theme.strokeWidthThick : theme.strokeWidth

			return (
				<div
					style={{
						color: "none",
						border: "none",

						opacity: props.strong ? 1 : 0.25,
						background: props.color || color_util.Mix(theme.colors.textBackground, theme.colors.textForeground, 0.3),

						width: props.horizontal ? "100%" : thickness,
						height: props.horizontal ? thickness : "auto",
						borderRadius: thickness / 2,
					}}
				></div>
			)
		},
	}
	borderSizes = {
		none: 0,
		default: sizes.L,
		small: sizes.S,
		big: sizes.L,
		circle: "50%",
	}

	fontStyle = {}

	muteSounds = false

	lineHeight = 10
	underlineOffset = 4
	underlineThickness = 1

	shadow = shadow
	shadowFooter = shadowFooter
	backgroundStyle = { backgroundImage: "url(" + SVGBackground + ")" }
	boxStyle = {
		Contents: (props: { children?: ReactNode; borderSize?: BorderSizes; color?: ThemeColor; shadow?: boolean; style?: CSSProperties; emphasis?: number; borderWidth?: number }) => {
			const bg = this.colors[props.color || "card"]
			if (color_util.GetAlpha(bg) === 0) {
				return <div>{props.children}</div>
			}
			return (
				<div
					style={{
						background: bg,
						borderRadius: this.borderSizes[props.borderSize || "default"],
						boxShadow: props.emphasis === 0 ? undefined : this.shadow,
						...props.style,
					}}
				>
					{props.children}
				</div>
			)
		},
	}
	buttonStyle = {
		noLight: false,
		hoverBrightness: 1.1,
		pressBrightness: 0.9,
		zDistance: 2,
		Contents: (props: { children?: ReactNode; color?: ThemeColor; hover?: boolean; pressed?: boolean; style?: CSSProperties; weak?: boolean }) => {
			return (
				<div
					style={{
						borderRadius: this.borderSizes.small,
						padding: this.sizes.M,
						boxShadow: props.weak ? "inset 0px 0px 0px " + this.strokeWidth + "px " + this.colors.primary : undefined,
						background: props.weak ? "transparent" : (props.color && this.colors[props.color]) || this.colors.primary,
						display: "flex",
						justifyContent: "center",
						...props.style,
					}}
				>
					{props.children}
				</div>
			)
		},
	}

	colors = {
		primary: colors.blue,
		secondary: colors.green,
		positive: colors["green-lighter"],
		neutral: colors["yellow-lighter"],
		negative: colors["red-darker"],
		negativeLight: colors["red-lighter"],
		active: colors.blue,
		inactive: colors.white,

		selectorBackground: colors.blue,
		selectorTextBackground: colors.white,
		selectorForeground: colors.white,
		selectorTextForeground: colors.blue,

		foreground: colors.white, // unused?
		background: colors.white, // unused?
		default: colors.black,
		header: colors.blue,
		cardHeader: colors.white,
		textForeground: colors.black,
		textH2Foreground: colors.darker,
		textH2Background: colors.lighter,
		textGraphEmphasis: colors.light, // For example an average score in a bargraph
		textButton: colors.white,
		dashedUnderline: "rgba(95,95,95,0.25)",
		codeBackground: colors.darker,
		textBackground: colors.white,
		mainBackground: colors.white,
		buttonColor: colors.blue,
		underline: colors.blue,
		urlForeground: colors.blue,
		urlBackground: colors["blue-lighter"],
		card: colors.white,
		chatbubble: colors.lightest,
		actualBlack: "rgb(0,0,0)",
		barColorHorizontal: colors.green,
		inherit: "inherit",
		footer: colors.white,
		driverPoints: colors.purple,
		driverPointsLight: colors["purple-light"],
		black: colors.black,
		darkest: colors.darkest,
		darker: colors.darker,
		dark: colors.dark,
		grey: colors.grey,
		light: colors.light,
		lighter: colors.lighter,
		lightest: colors.lightest,
		white: colors.white,
		package: colors.yellow,
		gold: colors.yellow,
		goldShadow: colors["yellow-darker"],
		grid: color_util.ModifyAlpha(colors.lighter, 0.25),
		productivity: colors.yellow,
		quality: colors.red,
		service: colors.blue,
	}
	static BaseIcons = icons
	icons = icons
}

export const Icon = (props: { inline?: boolean; type: keyof typeof icons; style?: CSSProperties; size?: ThemeSizes; color?: ThemeColor }) => {
	const theme = useTheme()
	const Icon = theme.icons[props.type]
	return <Icon key={props.type} size={theme.sizes[props.size || "M"]} color={props.color ? theme.colors[props.color] : undefined} style={{ display: "inline", ...props.style }} />
}
