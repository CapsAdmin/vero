import { Column, Row } from "./layout/row-column"

const DriverPersonWithInnerDropShadow = (props: { color: string }) => (
	<svg width="15" height="51" viewBox="0 0 15 51" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g opacity="0.6">
			<g filter="url(#filter0_i_334:3200)">
				<path
					d="M2.8125 33.8348C1.20785 33.5094 0 32.0918 0 30.3924V18.4494C0 15.992 1.99372 14 4.45314 14H10.5469C13.0063 14 15 15.992 15 18.4494V30.3924C15 32.0918 13.7921 33.5094 12.1875 33.8348V47.4873C12.1875 49.4273 10.6135 51 8.67188 51H6.32812C4.38648 51 2.8125 49.4273 2.8125 47.4873V33.8348Z"
					fill={props.color}
				/>
			</g>
			<g filter="url(#filter1_i_334:3200)">
				<path
					d="M5.64257 11.0883C7.16257 12.5583 8.1911 12.9572 10.3939 13C11.0578 12.9288 11.5836 12.814 11.6928 12.7283C11.9959 12.4922 12.2429 8.0757 12.1474 7.44176C12.0884 7.01645 12.0611 5.53671 12.0778 4.46452L14.968 3.45056C15.012 3.20964 15.0287 3.3034 14.8968 3.08347L12.1687 3.03172C12.1687 3.03172 11.7458 1.06525 11.1365 0.251803C10.1923 -0.395076 5.88495 0.272802 4.79973 1.47598C3.78279 2.60805 4.02528 5.2618 4.02528 5.2618H4.03587C4.0605 5.99903 4.1222 6.73427 4.22081 7.46441C4.35416 8.43473 5.00451 10.0776 5.64257 11.0883Z"
					fill={props.color}
				/>
			</g>
		</g>
		<defs>
			<filter id="filter0_i_334:3200" x="0" y="14" width="16" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
				<feOffset dx="1" dy="1" />
				<feGaussianBlur stdDeviation="1" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0.176471 0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0.29 0" />
				<feBlend mode="normal" in2="shape" result="effect1_innerShadow_334:3200" />
			</filter>
			<filter id="filter1_i_334:3200" x="4" y="0" width="12" height="14" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
				<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
				<feOffset dx="1" dy="1" />
				<feGaussianBlur stdDeviation="1" />
				<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
				<feColorMatrix type="matrix" values="0 0 0 0 0.176471 0 0 0 0 0.231373 0 0 0 0 0.329412 0 0 0 0.29 0" />
				<feBlend mode="normal" in2="shape" result="effect1_innerShadow_334:3200" />
			</filter>
		</defs>
	</svg>
)

export const DriverPerson = (props: { color: string; small?: boolean }) => (
	<svg width={props.small ? "6" : "15"} height={props.small ? "19" : "51"} viewBox="0 0 15 51" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fill={props.color}
			d="M2.8125 33.8348C1.20785 33.5094 0 32.0918 0 30.3924V18.4494C0 15.992 1.99372 14 4.45314 14H10.5469C13.0063 14 15 15.992 15 18.4494V30.3924C15 32.0918 13.7921 33.5094 12.1875 33.8348V47.4873C12.1875 49.4273 10.6135 51 8.67188 51H6.32812C4.38648 51 2.8125 49.4273 2.8125 47.4873V33.8348Z"
		/>
		<path
			fill={props.color}
			d="M5.64257 11.0883C7.16257 12.5583 8.1911 12.9572 10.3939 13C11.0578 12.9288 11.5836 12.814 11.6928 12.7283C11.9959 12.4922 12.2429 8.0757 12.1474 7.44176C12.0884 7.01645 12.0611 5.53671 12.0778 4.46452L14.968 3.45056C15.012 3.20964 15.0287 3.3034 14.8968 3.08347L12.1687 3.03172C12.1687 3.03172 11.7458 1.06525 11.1365 0.251803C10.1923 -0.395076 5.88495 0.272802 4.79973 1.47598C3.78279 2.60805 4.02528 5.2618 4.02528 5.2618H4.03587C4.0605 5.99903 4.1222 6.73427 4.22081 7.46441C4.35416 8.43473 5.00451 10.0776 5.64257 11.0883Z"
		/>
	</svg>
)

export const GraphPeople = (props: { postenActive: number; postenInactive: number; motiveroActive: number; motiveroInactive: number }) => {
	const tmpPostenPeople = []
	const tmpMotiveroPeople = []
	const rowSize = 14

	for (let i = 0; i < props.postenActive; i++) {
		tmpPostenPeople.unshift(<DriverPerson color="#E32D22" />)
	}
	for (let i = 0; i < props.postenInactive; i++) {
		tmpPostenPeople.unshift(<DriverPersonWithInnerDropShadow color="#FF8A5F" />)
	}
	for (let i = 0; i < props.motiveroActive; i++) {
		tmpMotiveroPeople.unshift(<DriverPerson color="#306082" />)
	}
	for (let i = 0; i < props.motiveroInactive; i++) {
		tmpMotiveroPeople.unshift(<DriverPersonWithInnerDropShadow color="#AECDE3" />)
	}

	const postenPeople = []
	const motiveroPeople = []
	const postenRows = Math.ceil(tmpPostenPeople.length / rowSize)
	const motiveroRows = Math.ceil(tmpMotiveroPeople.length / rowSize)
	for (let i = 0; i < motiveroRows; i++) {
		const people = []
		for (let j = 0; j < rowSize; j++) {
			people.unshift(tmpMotiveroPeople.pop())
		}
		motiveroPeople.unshift(
			<Row itemPadding="XXS" rowAlign="end">
				{people}
			</Row>,
		)
	}
	for (let i = 0; i < postenRows; i++) {
		const people = []
		for (let j = 0; j < rowSize; j++) {
			people.unshift(tmpPostenPeople.pop())
		}
		postenPeople.unshift(
			<Row itemPadding="XXS" rowAlign="end">
				{people}
			</Row>,
		)
	}

	return (
		<Row style={{ flex: 1 }} stretchColumn rowAlign="space between">
			<Column itemPadding="XXS" columnAlign="end">
				{postenPeople}
			</Column>
			<Column itemPadding="XXS" columnAlign="end">
				{motiveroPeople}
			</Column>
		</Row>
	)
}
