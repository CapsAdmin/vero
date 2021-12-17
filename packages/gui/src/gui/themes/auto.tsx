import { DarkTheme } from "./dark"
import { LightTheme } from "./light"
import { IsDarkThemePrefered } from '../../other/browser';

let Theme

if (IsDarkThemePrefered) {
	Theme = DarkTheme
} else {
	Theme = LightTheme
}

export class AutoTheme extends Theme {}
