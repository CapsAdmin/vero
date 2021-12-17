import { useEffect, useState } from "react"

export class Observer<T> {
	_value: T

	constructor(value: T) {
		this._value = value
	}
	private subscribers: Array<(value: T) => void> = [] // List of subscribers

	get value() {
		return this._value
	}

	set value(newValue: T) {
		if (this.value === newValue) return

		this._value = newValue

		for (let callback of this.subscribers) {
			callback(this.value)
		}
	}

	subscribe(callback: (value: T) => void) {
		if (this.subscribers.includes(callback)) return

		this.subscribers.push(callback)
	}

	unsubscribe(callback: (value: T) => void) {
		let index = this.subscribers.indexOf(callback)
		if (index !== -1) {
			this.subscribers.splice(index, 1)
		}
	}

	setValue(newValue: T) {
		this.value = newValue
	}

	private setter = this.setValue.bind(this)

	use() {
		/* eslint-disable-next-line */
		let [state, setState] = useState(this.value)

		/* eslint-disable-next-line */
		useEffect(() => {
			const updateValue = (value: T) => {
				setState(value)
			}

			this.subscribe(updateValue)

			return () => {
				this.unsubscribe(updateValue)
			}
		}, [])

		return [state as T, this.setter] as const
	}
}
