import { getCurrentTheme, useTheme } from "@vero/gui-theme"
import { InjectCSS } from "@vero/util/css"
import { Lerp } from "@vero/util/other"
import { pages } from "@vero/util/pages"
import { CRS, LatLngTuple, Map as LeafletMap, SVGOverlay as LeafletSvgOverlay } from "leaflet"
import "leaflet/dist/leaflet.css"
import "proj4leaflet"
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MapContainer, SVGOverlay, TileLayer } from "react-leaflet"
import { Box } from "../components/box"
import { Clickable } from "../components/interactive/clickable"
import { Column } from "../components/layout/row-column"
import { H2 } from "../showcase/typography"
import { Text } from "../typography"

/*
    navn
    sist opdatert
    antall pakker på terminal
    pakker sortert i timen
    hvor mange som er checked in
    pause time

    kontrollere skjermene med telefon? spill osv
    bruke unity?
*/

let terminals: Array<{
	name: string
	description: string
	image?: string
	point: [number, number]
}> = [
	{
		name: "Oslo",
		image: "https://image.mtlogistikk.no/162235.jpg?imageId=162235&width=480&height=270",
		description: "Posten & Brings Logistikksenter Oslo",
		point: [59.9338284, 10.84832],
	},
	{
		name: "Drammen",
		description: "Bring Transport packages and freight, Drammen",
		image: "https://lh5.googleusercontent.com/p/AF1QipNqVv-H1byCXA68xDzoEkn5murf_HX0tihvX4-P=w425-h240-k-no",
		point: [59.7595254, 10.2532005],
	},
	{
		name: "Hamar",
		description: "Bring Transport Pakker og Gods, Hamar",
		point: [60.8381813, 11.0906579],
	},
	{
		name: "Bergen",
		description: "Bring Transport packages and freight, Bergen",
		point: [60.3912839, 5.3090356],
	},
]

const CustomMapComponent = (props: { map: LeafletMap; point: [number, number]; children?: ReactNode }) => {
	const map = props.map
	if (!map || !map._mapPane) return null
	const [position, setPosition] = useState(map.getCenter())

	const onUpdate = useCallback(() => {
		setPosition(map.getCenter())
	}, [map])

	useEffect(() => {
		map.on("move", onUpdate)

		return () => {
			map.off("move", onUpdate)
		}
	}, [map, onUpdate])

	let a = props.map.project(position, props.map.getZoom())
	let b = props.map.project(props.point, props.map.getZoom())

	a.x = b.x - a.x
	a.y = b.y - a.y

	return (
		<div
			style={{
				zIndex: 1000,
				position: "absolute",
				top: `calc(${a.y}px + 50%)`,
				left: `calc(${a.x}px + 50%)`,
				transform: "translate(-50%, -50%)",
			}}
		>
			{props.children}
		</div>
	)
}

/*
	immo: 
		heatmap
		terminal level



*/

const mapThemes: {
	[key: string]: {
		url: string
		crs?: CRS
		filter?: string
	}
} = {
	posten: {
		url: "https://services.geodataonline.no/arcgis/rest/services/Geocache_UTM33_EUREF89/GeocacheBasis/MapServer/tile/{z}/{y}/{x}",
		crs: new window.L.Proj.CRS("EPSG:25833", "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs", {
			resolutions: [
				21674.7100160867, 10837.35500804335, 5418.677504021675, 2709.3387520108377, 1354.6693760054188, 677.3346880027094, 338.6673440013547, 169.33367200067735, 84.66683600033868,
				42.33341800016934, 21.16670900008467, 10.583354500042335, 5.291677250021167, 2.6458386250105836, 1.3229193125052918, 0.6614596562526459, 0.33072982812632296, 0.16536491406316148,
			],
			origin: [-2500000, 9045984.0],
		}),
		//url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png",
		//filter: "saturate(8) hue-rotate(-10deg) brightness(0.6) contrast(4) saturate(0.8)",
	},
	posten2: {
		url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png",
		filter: "brightness(0.5) contrast(3) brightness(2) saturate(2.4) hue-rotate(-10deg)",
	},
	mybring: {
		url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png",
		filter: "brightness(0.5) contrast(3) brightness(2) hue-rotate(-30deg) saturate(2.7)",
	},
	light: {
		url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png",
	},
	jrpg: {
		url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png",
		filter: "sepia(1) hue-rotate(170deg) saturate(2.5) brightness(1.5) contrast(1.15)",
	},
	dark: {
		url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png",
	},
	motivero: {
		url: "http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
	},
}

InjectCSS(`
	.path-forward   {
		stroke-dashoffset: 1000;
		animation: dash 5s linear infinite;
  	}
  
  	@keyframes dash {
		to {
		  	stroke-dashoffset: 0;
		}
  	}
`)

const MapLine = (props: { from: LatLngTuple; to: LatLngTuple; map: LeafletMap }) => {
	const [rect, setRect] = useState<DOMRect>()
	const svgRef = useRef<LeafletSvgOverlay>()
	const map = props.map

	const onUpdate = useCallback(() => {
		setRect(svgRef.current.getElement().getBoundingClientRect())
	}, [map])

	useEffect(() => {
		setTimeout(() => {
			onUpdate()
		}, 100)
		map.on("move", onUpdate)

		return () => {
			map.off("move", onUpdate)
		}
	}, [map, onUpdate])

	const theme = useTheme()

	//let res = rect ? svgVariableWidthLine.compute({ x: 0, y: rect.height, w: 1 }, { x: rect.width / 2, y: rect.height / 2, w: 6 }, { x: rect.width, y: 0, w: 1 }) : undefined

	return (
		<SVGOverlay ref={svgRef} bounds={[props.from, props.to]}>
			{!rect ? null : (
				<path
					className="path-forward"
					d={`M 0 ${rect.height} Q ${rect.width / 2} ${rect.height / 4} ${rect.width} 0`}
					strokeWidth={1}
					strokeDasharray={(1 / map.getZoom()) * 700}
					fill="transparent"
					stroke={theme.colors.textForeground}
				/>
			)}
		</SVGOverlay>
	)
}

function Map() {
	const theme = useTheme()
	const themeName = getCurrentTheme()
	const [map, setMap] = useState<LeafletMap>(null)
	let mapConfig = mapThemes[themeName] || mapThemes.light
	const [selectedTerminal, setSelectedTerminal] = useState<typeof terminals[number]>(terminals[0])

	const displayMap = useMemo(() => {
		return (
			<MapContainer
				zoomControl={false}
				key={themeName}
				style={{ width: "100vw", height: "100vh" }}
				scrollWheelZoom={true}
				whenCreated={(map) => {
					setMap(map)
					if (mapConfig.crs) {
						map.options.crs = mapConfig.crs
					}
					map.setView([59.926958, 10.710272], 10)
				}}
			>
				<TileLayer
					ref={(layer) => {
						if (mapConfig.filter && layer && layer.getContainer()) {
							layer.getContainer().style.setProperty("filter", mapConfig.filter)
						}
					}}
					url={mapConfig.url}
				/>
				{map ? <MapLine map={map} from={terminals[0].point} to={terminals[1].point} /> : null}
				{map ? <MapLine map={map} from={terminals[1].point} to={terminals[2].point} /> : null}
				{!map
					? null
					: terminals.map((t) => (
							<CustomMapComponent map={map} point={t.point}>
								<Clickable
									onClick={() => {
										setSelectedTerminal(t)

										let start = map.getCenter()
										let middlePoint: [number, number] = [Lerp(0.5, start.lat, t.point[0]), Lerp(0.5, start.lng, t.point[1])]

										let zoom = map.getZoom()

										map.flyTo(middlePoint, zoom - 1, {
											animate: true,
											duration: 1,
										})

										map.once("moveend", () => {
											map.flyTo(t.point, zoom + 2, {
												animate: true,
												duration: 5,
											})
										})
									}}
								>
									<Text>{t.name}</Text>
								</Clickable>
							</CustomMapComponent>
					  ))}

				<div style={{ position: "absolute", top: theme.sizes.S, left: theme.sizes.S, zIndex: 1000 }}>
					<Box>
						<Column style={{ maxWidth: 300 }}>
							<H2>{selectedTerminal.name}</H2>
							<Text>6003 pakker</Text>
							<Text>3052 sorteringer i timen</Text>
							<Text>333 ansatte sjekket inn</Text>
							<img style={{ width: 300 }} src={selectedTerminal.image}></img>
							<Text>{selectedTerminal.description}</Text>
						</Column>
					</Box>
				</div>
			</MapContainer>
		)
	}, [map, themeName, selectedTerminal])

	return displayMap
}

pages.Add("map", () => {
	return <Map />
})
