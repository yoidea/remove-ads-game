import { useRef, useEffect } from "react"

const soundFiles = [
	"start",
	"close1",
	"close2",
	"close3",
	"close4",
	"miss",
	"open",
	"clear",
	"bgm",
	"bgm2",
]

export const useSound = () => {
	const audioContextRef = useRef<AudioContext | null>(null)
	const audioBuffersRef = useRef<{ [key: string]: AudioBuffer }>({})
	const BGMSourceRef = useRef<AudioBufferSourceNode | null>(null)

	useEffect(() => {
		if (typeof window !== "undefined") {
			const audioContext = new AudioContext()
			audioContextRef.current = audioContext
			BGMSourceRef.current = audioContextRef.current.createBufferSource()

			soundFiles.forEach((sound) => {
				fetch(`/${sound}.mp3`)
					.then((response) => response.arrayBuffer())
					.then((buffer) => audioContext.decodeAudioData(buffer))
					.then((data) => {
						audioBuffersRef.current[sound] = data
					})
					.catch((error) => console.error("Audio error", error))
			})

			const handleLifecycleStop = () => {
				stopBGM()
			}
			window.addEventListener("pagehide", handleLifecycleStop)
			window.addEventListener("popstate", handleLifecycleStop)
			document.addEventListener("visibilitychange", () => {
				if (document.visibilityState === "hidden") handleLifecycleStop()
			})

			return () => {
				try {
					stopBGM()
					window.removeEventListener("pagehide", handleLifecycleStop)
					window.removeEventListener("popstate", handleLifecycleStop)
					if (audioContextRef.current?.state !== "closed") {
						audioContextRef.current?.close().catch(() => {})
					}
				} catch {}
			}
		}
	}, [])

	const playSound = (name: string) => {
		const buffer = audioBuffersRef.current[name]
		if (audioContextRef.current && buffer) {
			const source = audioContextRef.current.createBufferSource()
			source.buffer = buffer
			source.connect(audioContextRef.current.destination)
			source.start(0)
		}
	}

	const stopBGM = () => {
		if (BGMSourceRef.current) {
		// 二重停止例外ガード
			try {
				BGMSourceRef.current.stop()
			} catch {}
			try {
				BGMSourceRef.current.disconnect()
			} catch {}
			BGMSourceRef.current = null
		}
	}

	const setBGM = (name: string) => {
		const buffer = audioBuffersRef.current[name]
		if (audioContextRef.current && buffer) {
			const gain = audioContextRef.current.createGain()
			gain.gain.value = 0.3
			const source = audioContextRef.current.createBufferSource()
			source.buffer = buffer
			source.loop = true
			source.connect(gain)
			gain.connect(audioContextRef.current.destination)
			source.start(0)
			BGMSourceRef.current = source
		}
	}

	return { playSound, stopBGM, setBGM }
}
