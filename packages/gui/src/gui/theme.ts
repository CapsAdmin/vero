import { Setting } from "@vero/util/settings"
import { setCurrentTheme } from "@vero/gui-theme"
export const themeNameSetting = Setting("theme", "motivero")
themeNameSetting.subscribe((themeName) => {
	setCurrentTheme(themeName)
})
