import { useDebugThemeSwitcher } from "@vero/gui-theme"
import { location } from "@vero/util/location"
import { DEBUG } from "@vero/util/other"
import { useEffect } from "react"
import { ModalLayer } from "./components/modal-layer"
import { ThemeBackground } from "./components/theme-background"
import "./global-style.css"
import { pages, Pages } from "./pages"
import { themeNameSetting } from "./theme"
import { editTranslationState, LanguageEditToolbar, languageSetting, useDebugLanguageSwitcher } from "./translation"
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

const Main = () => {
	if (DEBUG) {
		editTranslationState.use()
		useQuerySettingsOverride()
		useDebugThemeSwitcher()
		useDebugLanguageSwitcher()
	}

    let MapPage =  pages.Find("map")

	return (
		<>
			<MapPage />
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
