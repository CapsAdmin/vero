import { CRC32 } from "@frontend/app/thirdparty"
import React from "react"
import { useTheme } from "@vero/gui-theme"
import { InjectCSS } from "../../other/css"
import { LazyLoad } from "./lazy-load"
import { Avatar } from "@frontend/app/thirdparty"

const configs = {
	topType: [
		"NoHair",

		"LongHairBigHair",
		"LongHairBob",
		"LongHairBun",
		"LongHairCurly",
		"LongHairCurvy",
		// "LongHairDreads",

		"LongHairFro",
		"LongHairFroBand",
		"LongHairNotTooLong",
		// "LongHairShavedSides",
		"LongHairMiaWallace",
		"LongHairStraight",
		"LongHairStraight2",
		"LongHairStraightStrand",
		"ShortHairDreads01",
		"ShortHairDreads02",
		"ShortHairFrizzle",
		"ShortHairShaggyMullet",
		"ShortHairShortCurly",
		"ShortHairShortFlat",
		"ShortHairShortRound",
		"ShortHairShortWaved",
		"ShortHairSides",

		// "ShortHairTheCaesar",
		// "ShortHairTheCaesarSidePart",
	],
	accessoriesType: [
		"Blank",
		// 'Kurt',
		// 'Prescription01',
		"Prescription02",
		"Round",
		// 'Sunglasses',
		// 'Wayfarers'
	],
	hatColor: [
		"Black",
		"Blue01",
		"Blue02",
		"Blue03",
		"Gray01",
		"Gray02",
		// 'Heather',
		"PastelBlue",
		"PastelGreen",
		"PastelOrange",
		"PastelRed",
		"PastelYellow",
		// 'Pink',
		// 'Red',
		"White",
	],
	hairColor: [
		"Auburn",
		"Black",
		"Blonde",
		"BlondeGolden",
		"Brown",
		"BrownDark",
		// 'PastelPink',
		"Platinum",
		// 'Red',
		"SilverGray",
	],
	facialHairType: [
		"Blank",
		"BeardMedium",
		"BeardLight",
		// 'BeardMajestic',
		"MoustacheFancy",
		"MoustacheMagnum",
	],
	facialHairColor: ["Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark", "Platinum", "Red"],
	clotheType: ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt", "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"],
	clotheColor: [
		"Black",
		"Blue01",
		"Blue02",
		"Blue03",
		"Gray01",
		"Gray02",
		// 'Heather',
		"PastelBlue",
		"PastelGreen",
		// 'PastelOrange',
		"PastelRed",
		// 'PastelYellow',
		"Pink",
		"Red",
		// 'White'
	],
	graphicType: ["Bat", "Cumbia", "Deer", "Diamond", "Hola", "Pizza", "Resist", "Selena", "Bear", "SkullOutline", "Skull"],
	eyeType: [
		"Close",
		"Cry",
		"Default",
		"Dizzy",
		"EyeRoll",
		"Happy",
		// 'Hearts',
		"Side",
		// 'Squint',
		// 'Surprised',
		// 'Wink',
		// 'WinkWacky'
	],
	eyebrowType: [
		"Angry",
		"AngryNatural",
		"Default",
		"DefaultNatural",
		"FlatNatural",
		"RaisedExcited",
		"RaisedExcitedNatural",
		"SadConcerned",
		"SadConcernedNatural",
		"UnibrowNatural",
		"UpDown",
		"UpDownNatural",
	],
	mouthType: ["Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad", "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle", "Vomit"],
	skinColor: [
		// 'Tanned',
		// 'Yellow',
		"Pale",
		// 'Light',
		"Brown",
		// 'DarkBrown',
		// 'Black'
	],
}

const configsKeys = Object.keys(configs) as Array<keyof typeof configs>

function rand(seed: string) {
	return CRC32.str(seed) / 0xffffffff + 0.5
}

let lastColor = ""

const InternalPerson = (props: { seed: string; happiness: number }) => {
	const theme = useTheme()

	if (lastColor !== theme.colors.primary) {
		InjectCSS(`
            #Color\\/Palette\\/Blue-01 {
                fill: ${theme.colors.primary};
            }}
        `)
		lastColor = theme.colors.primary
	}

	const options: { [key: string]: string } = {}
	const random = rand(props.seed || Math.random().toString())

	for (const key of configsKeys) {
		const random2 = rand(random.toString() + key)
		const index = Math.floor(random2 * configs[key].length)

		options[key] = configs[key][index]
	}

	if (random < 0.5) {
		options.accessoriesType = "Blank"
	}

	options.eyeType = "Default"

	const happiness = props.happiness

	if (happiness === 0) {
		options.mouthType = "Grimace"
		options.eyebrowType = "Angry"
	} else if (happiness < 0.3) {
		options.mouthType = "Concerned"
		options.eyebrowType = "SadConcerned"
	} else if (happiness < 0.6) {
		options.mouthType = "Sad"
		options.eyebrowType = "Default"
	} else if (happiness < 0.7) {
		options.mouthType = "Serious"
		options.eyebrowType = "Default"
	} else if (happiness < 0.9) {
		options.mouthType = "Twinkle"
		options.eyebrowType = "Default"
	} else if (happiness >= 0.9) {
		options.mouthType = "Default"
		options.eyebrowType = "Default"
		options.eyeType = "Default"
	}

	if (happiness === 1) {
		options.mouthType = "Default"
	}

	if (options.skinColor === "Tanned" || options.skinColor === "Black" || options.skinColor === "DarkBrown" || options.skinColor === "Brown") {
		options.hairColor = "Black"
	}

	options.facialHairType = "Blank"
	options.clotheType = "ShirtScoopNeck"

	console.log(options, happiness)

	const size = "70px"
	return (
		<div
			style={{
				minWidth: size,
				width: size,
				height: size,
				margin: "-5px",
				marginTop: "-10px",
				marginBottom: "0px",
			}}
		>
			<Avatar
				style={{
					width: size,
					height: size,
				}}
				avatarStyle="Circle"
				{...options}
			/>
		</div>
	)
}

export const Person = (props: { seed: string; happiness: number }) => {
	return (
		<LazyLoad
			style={{
				minWidth: 70,
				minHeight: 70,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<InternalPerson {...props} />
		</LazyLoad>
	)
}
