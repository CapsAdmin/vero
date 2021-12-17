import { InjectCSS } from "@vero/util/css"
import React, { ReactNode } from "react"
import { Carousel as ReactResponsiveCarousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { useTheme } from "@vero/gui-theme"

// turn off overflow so that when we use the carousel on mobile it ignores margins
InjectCSS(`
.carousel .slider-wrapper {
	overflow: visible;
}
.carousel.carousel-slider {
	overflow: visible;
}
`)

export const Carousel = (props: { children: ReactNode; selected?: number; onSelect?: (i: number) => void }) => {
	const theme = useTheme()
	return (
		<ReactResponsiveCarousel
			selectedItem={props.selected}
			onChange={(i) => {
				if (props.onSelect) {
					props.onSelect(i)
				}
			}}
			autoFocus={true}
			autoPlay={false}
			interval={999999999} // workaround as autoPlay=false doesn't work
			//dynamicHeight={true}
			emulateTouch={true}
			showArrows={false}
			showStatus={false}
			showThumbs={false}
			swipeable={true}
			showIndicators={false}
			centerMode={true}
			centerSlidePercentage={80}
		>
			{
				React.Children.toArray(props.children).map((child, i) => {
					return (
						<div key={i.toString()} style={{ padding: theme.sizes.S }}>
							{child}
						</div>
					)
				}) as typeof ReactResponsiveCarousel.defaultProps.children
			}
		</ReactResponsiveCarousel>
	)
}
