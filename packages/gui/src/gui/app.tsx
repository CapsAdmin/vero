import { GetAvailableThemeNames } from "@vero/gui-theme"
import { location } from "@vero/util/location"
import { DEBUG } from "@vero/util/other"
import { useEffect } from "react"
import { ModalLayer } from "./components/modal-layer"
import { ThemeBackground } from "./components/theme-background"
import "./global-style.css"
import { Pages } from "./pages"
import { themeNameSetting } from "./theme"
import { editTranslationState, LanguageEditToolbar, languageSetting } from "./translation"
import { AppUpdater } from "./widgets/app-updater"
import { NavigationDrawer } from "./widgets/navigation-drawer"

const useQuerySettingsOverride = () => {
	const { search } = location.use()
	useEffect(() => {
		if (search.theme) {
			themeNameSetting.value = search.theme
		}
	}, [search.theme])

	useEffect(() => {
		if (search.lang === "no" || search.lang === "en" || search.lang === "auto") {
			languageSetting.value = search.lang
		}
	}, [search.lang])
}

const useDebugKeys = () => {
	if (DEBUG) {
		useEffect(() => {
			let themes = [...GetAvailableThemeNames()].filter((a) => a && a !== "auto")
			let i = 0
			let cb = (e: KeyboardEvent) => {
				if (document.activeElement?.nodeName === "INPUT") {
					return
				}

				if (e.key === "t") {
					themeNameSetting.value = themes[i]

					i++
					if (i >= themes.length) {
						i = 0
					}
					console.log("changed theme to " + themes[i])
				}
				if (e.key === "l") {
					if (languageSetting.value === "no") {
						languageSetting.value = "en"
					} else {
						languageSetting.value = "no"
					}
				}
			}
			window.addEventListener("keypress", cb)

			return () => {
				window.removeEventListener("keypress", cb)
			}
		}, [])
	}
}

const Main = () => {
	// DBEUG will not change at runtime
	if (DEBUG) {
		// eslint-disable-next-line
		editTranslationState.use()
		// eslint-disable-next-line
		useQuerySettingsOverride()
		// eslint-disable-next-line
		useDebugKeys()
	}

	return (
		<>
			<ModalLayer />
			<LanguageEditToolbar />
			<Pages />
			<NavigationDrawer />
			<ThemeBackground key="background" />
		</>
	)
}

export const App = () => {
	// we have to use location here, otherwise we might end up with a blank page
	// it's use()'d in in pages too, but that's not enough
	// since we do location.Replace further down outside of react the root
	// component is dependent on location too
	location.use()

	return (
		<>
			<AppUpdater />
			<Main />
		</>
	)
}
