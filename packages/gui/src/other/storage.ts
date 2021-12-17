if (localStorage) {
	for (let i = 0; i < localStorage.length; i++) {
		let key = localStorage.key(i)!
		if (key.endsWith("-avatar")) {
			localStorage.removeItem(key)
		}
	}
}

export function storageSetItem(key: string, val: string) {
	localStorage.setItem(key, val)
}

export function storageGetItem(key: string) {
	return localStorage.getItem(key)
}
export function storageRemoveItem(key: string) {
	return localStorage.removeItem(key)
}

export function storageClear() {
	return localStorage.clear()
}
