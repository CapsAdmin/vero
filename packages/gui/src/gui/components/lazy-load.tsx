import React, { CSSProperties, ReactNode, useState } from "react"

export const LazyLoad = (props: { style?: CSSProperties; children?: ReactNode }) => {
	const [visible, setVisible] = useState(false)

	const observer = new IntersectionObserver(
		([entry]) => {
			setVisible(entry.isIntersecting)
		},
		{
			threshold: [0],
		},
	)

	return (
		<div
			style={props.style}
			ref={(e) => {
				if (e) {
					observer.observe(e)
				} else {
					observer.disconnect()
				}
			}}
		>
			{visible ? props.children : null}
		</div>
	)
}
