/// <reference types="react-scripts" />
// src/react-app-env.d.ts
/// <reference types="react-dom/experimental" />/// <reference types="react/experimental" />

declare module "*.png"
declare module "*.svg"

declare module "*.mp3" {
	const src: string
	export default src
}

declare module "*.ogg" {
	const src: string
	export default src
}

declare module "*.ttf" {
	const content: string
	export default src
}
