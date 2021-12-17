import { AvatarData } from "@frontend/gui/widgets/avatar"
import { useEffect, useState } from "react"

const packUserData = (data: UserData) => {
	let newData = JSON.parse(JSON.stringify(data))

	newData.avatar = JSON.stringify(data.avatar)

	delete newData.role
	delete newData.isActivated
	delete newData.id
	delete newData.mobile
	delete newData.driver_id

	return newData
}

const unpackUserData = (data: UserData) => {
	try {
		data.avatar = JSON.parse(data.avatar as unknown as string)
	} catch (err) {
		console.error("unable to parse avatar", data.avatar)
	}

	return data
}

export interface UserData {
	isActivated: boolean // read only
	id: string // read only
	role: string // read only
	driver_id: string
	nickname?: string
	mobile: string
	last_name: string
	first_name: string
	teamOptIn?: boolean
	avatar?: AvatarData
}

export class API {
	inputValidationOnly = false

	async SubmitUserData(data: UserData) {
		const id = data.id
		data = packUserData(data)

		//let res = await motiveroApi.patch("/users/" + id, data)

		let newData = unpackUserData(data)

		return newData
	}
}

export const useApiCall = <T>(callback: () => Promise<T>, deps?: any[]) => {
	const [data, setData] = useState<null | T>(null)
	const [error, setError] = useState<undefined | string>(undefined)

	useEffect(() => {
		;(async () => {
			try {
				setData(await callback())
			} catch (err) {
				if (!(err instanceof Error)) {
					throw new Error("unknown error: " + err)
				}
				setError(err.message)
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps || [])

	return [data, error] as const
}

export const api = new API()
