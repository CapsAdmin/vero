import { api, UserData } from "@frontend/api/api"
import { Setting } from "@frontend/app/settings"
import { Observer } from "@frontend/other/observer"

export const userDataState = new Observer({} as UserData)
export const workDaysState = new Observer({ fromDate: new Date(0), toDate: new Date(), totalDriverPoints: 0 })

export const getDriverId = () => {
	if (driverIdOverrideSetting.value !== "") {
		return driverIdOverrideSetting.value
	}

	return userDataState.value.driver_id
}

export const submitUserData = async (data: UserData) => {
	const res = await api.SubmitUserData(data)
	userDataState.value = res
	return res
}
export const submitPartialUserData = async (data: Partial<UserData>) => {
	const res = await api.SubmitUserData({ ...userDataState.value, ...data })
	userDataState.value = res
	return res
}
export const useUserData = () => {
	const [value] = userDataState.use()
	return value as NonNullable<typeof userDataState.value>
}
export const driverIdOverrideSetting = Setting("driverIdOverride", "")

// used for debug
export const driverIdOverrideState = new Observer<string>("")

export const overrideRole = (role: string) => {
	roleOverrideState.value = role
}

const roleOverrideState = new Observer<string>("")

export const getRole = () => {
	return roleOverrideState.value || userDataState.value.role || "driver"
}

export const isAdmin = () => {
	if (!userDataState.value) return false
	const role = getRole()
	return role === "admin"
}

export const isTransportManager = () => {
	if (!userDataState.value) return false
	const role = getRole()
	return role === "admin" || role === "transportleder"
}
