import { Observer } from "@frontend/other/observer"
import { storageGetItem, storageSetItem } from "@frontend/other/storage"

export const Setting = <T>(key: string, initialValue: T) => {
	let blob = storageGetItem("settings-" + key)

	if (blob === null) {
		blob = JSON.stringify(initialValue)
		storageSetItem("settings-" + key, blob)
	}

	const o = new Observer<T>(blob !== null ? JSON.parse(blob) : initialValue)

	o.subscribe((newValue) => {
		storageSetItem("settings-" + key, JSON.stringify(newValue))
	})

	return o
}
