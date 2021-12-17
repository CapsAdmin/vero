import { RandomSeed } from "@frontend/other/other"

const mute = false
const NOVOLUME = 0.0001
let audioContext: AudioContext
let room: ConvolverNode
let masterGain: GainNode
let noiseBuffer: AudioBuffer

const getAudioContext = () => {
	if (!audioContext) {
		// create web audio api context
		audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
			latencyHint: 0,
			// sampleRate: 44100,
		})

		const SEED = 2000

		room = audioContext.createConvolver()

		{
			const bufferSize = 0.6 * audioContext.sampleRate
			const noiseBuffer = audioContext.createBuffer(2, bufferSize, audioContext.sampleRate)
			const output = noiseBuffer.getChannelData(0)
			const output2 = noiseBuffer.getChannelData(1)

			for (let i = 0; i < bufferSize; i++) {
				const f = -(i / bufferSize) + 1
				output[i] = (RandomSeed(i + SEED) * 2 - 1) * Math.pow(f, 35) * 0.00025
				output2[i] = (RandomSeed(i + SEED) * 2 - 1) * Math.pow(f, 35) * 0.00025
			}

			room.buffer = noiseBuffer
		}

		masterGain = audioContext.createGain()
		masterGain.connect(audioContext.destination)
		masterGain.gain.value = 0.2

		room.connect(masterGain)

		const bufferSize = 2 * audioContext.sampleRate
		noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
		const output = noiseBuffer.getChannelData(0)

		for (let i = 0; i < bufferSize; i++) {
			output[i] = RandomSeed(i + SEED) * 2 - 1
		}
	}

	return audioContext
}

export const WoshSound = (exit?: boolean) => {
	if (mute) {
		return
	}
	const oscillator = getAudioContext().createBufferSource()
	oscillator.buffer = noiseBuffer
	oscillator.loop = true
	oscillator.playbackRate.value = 1
	const duration = 0.35

	const gain = getAudioContext().createGain()
	gain.connect(room)
	gain.connect(masterGain)
	gain.gain.value = NOVOLUME

	// const oscillator = audioContext.createOscillator()

	{
		const filter = getAudioContext().createBiquadFilter()
		filter.connect(gain)
		filter.type = "bandpass"
		filter.frequency.value = 400
		filter.Q.value = 5
		filter.gain.value = 0.5
		oscillator.connect(filter)

		if (exit) {
			filter.frequency.setTargetAtTime(0, getAudioContext().currentTime, 0.1)
		}
	}

	oscillator.start()
	gain.gain.value = 0
	gain.gain.setTargetAtTime(0.5, getAudioContext().currentTime, 0.035)
	gain.gain.setTargetAtTime(0, getAudioContext().currentTime + 0.035, 0.035)

	oscillator.stop(getAudioContext().currentTime + duration)
}

const grr = []
for (let i = 1; i > 0; i = i - 0.001) {
	grr.push(i)
}
grr.push(0)

export const PressSound = (pitch?: number) => {
	if (mute) {
		return
	}

	const duration = 1

	const oscillator = getAudioContext().createBufferSource()
	oscillator.buffer = noiseBuffer
	oscillator.playbackRate.value = 0.1 * (pitch ? pitch : 1)

	const gain = getAudioContext().createGain()
	gain.connect(room)
	gain.connect(masterGain)
	// gain.gain.value = volume

	{
		const filter = getAudioContext().createBiquadFilter()
		filter.connect(gain)
		filter.type = "lowpass"
		filter.frequency.value = 200
		filter.Q.value = 5
		filter.gain.value = 1
		oscillator.connect(filter)
	}

	{
		const filter = getAudioContext().createBiquadFilter()
		filter.connect(gain)
		filter.type = "bandpass"
		filter.frequency.value = 700
		filter.Q.value = 6
		filter.gain.value = 0.1
		oscillator.connect(filter)
	}
	const now = getAudioContext().currentTime

	gain.gain.setTargetAtTime(0, getAudioContext().currentTime, 0.0025)
	oscillator.start()
	oscillator.stop(now + duration)
}
export const ReleaseSound = (pitch?: number) => {
	if (mute) {
		return
	}

	const duration = 1

	const oscillator = getAudioContext().createBufferSource()
	oscillator.buffer = noiseBuffer
	oscillator.playbackRate.value = (0.1 / 2) * (pitch ? pitch : 1)

	// const oscillator = audioContext.createOscillator()
	const gain = getAudioContext().createGain()
	gain.connect(room)
	gain.connect(masterGain)

	{
		const filter = getAudioContext().createBiquadFilter()
		filter.connect(gain)
		filter.type = "lowpass"
		filter.frequency.value = 200
		filter.Q.value = 5
		filter.gain.value = 1
		oscillator.connect(filter)
	}

	{
		const filter = getAudioContext().createBiquadFilter()
		filter.connect(gain)
		filter.type = "bandpass"
		filter.frequency.value = 1000
		filter.Q.value = 6
		filter.gain.value = 0.1
		oscillator.connect(filter)
	}

	oscillator.start()
	oscillator.stop(getAudioContext().currentTime + duration)
	gain.gain.value = 1
	gain.gain.setTargetAtTime(0, getAudioContext().currentTime, 0.0025)
}

export const Rumble = () => {
	if (mute) {
		return
	}

	const oscillator = getAudioContext().createBufferSource()
	oscillator.buffer = noiseBuffer
	oscillator.loop = true
	oscillator.playbackRate.value = 0.002
	const duration = 1

	// const oscillator = audioContext.createOscillator()
	const gain = getAudioContext().createGain()
	gain.connect(room)
	gain.connect(getAudioContext().destination)
	gain.gain.value = 1

	// oscillator.type = type
	// oscillator.frequency.setValueAtTime(freq / 2, audioContext.currentTime)
	const filter = getAudioContext().createBiquadFilter()
	filter.connect(gain)
	filter.type = "lowpass"
	filter.frequency.value = 300
	oscillator.connect(filter)

	oscillator.start()
	gain.gain.setTargetAtTime(0, audioContext.currentTime, 0.1)

	oscillator.stop(getAudioContext().currentTime + duration)

	if (window.navigator.vibrate) {
		const time = Date.now() + 1000
		let id: NodeJS.Timeout
		id = setInterval(() => {
			const f = (time - Date.now()) / 1000
			if (Math.random() < Math.pow(f, 2)) {
				window.navigator.vibrate(Math.random() * 10)
			}
			if (f < 0) {
				clearInterval(id)
			}
		}, 0)
	}
}

export const Vibrate = (duration: number) => {
	if (window.navigator.vibrate) {
		window.navigator.vibrate(duration)
	}
}
