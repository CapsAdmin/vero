import { DarkTheme } from "./dark"
import { LightTheme } from "./light"

export const IsDarkThemePrefered = window.matchMedia("(prefers-color-scheme: dark)").matches

let Theme

if (IsDarkThemePrefered) {
	Theme = DarkTheme
} else {
	Theme = LightTheme
}

export class AutoTheme extends Theme {}
