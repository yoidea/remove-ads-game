import { useState } from "react"

interface VolumeControlProps {
	onVolumeChange: (volume: number) => void
	initialVolume?: number
}

interface VolumeIconProps {
	isMuted: boolean
	volume: number
}

const VolumeIcon = ({ isMuted, volume }: VolumeIconProps) => {
	if (isMuted || volume === 0) {
		return (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
				<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
			</svg>
		)
	} else if (volume < 0.5) {
		return (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
				<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
			</svg>
		)
	} else {
		return (
			<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
				<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
			</svg>
		)
	}
}

export const VolumeControl = ({
	onVolumeChange,
	initialVolume = 0.3,
}: VolumeControlProps) => {
	const [volume, setVolume] = useState(initialVolume)
	const [isMuted, setIsMuted] = useState(false)
	const [previousVolume, setPreviousVolume] = useState(initialVolume)

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value)
		setVolume(newVolume)
		if (newVolume > 0 && isMuted) {
			setIsMuted(false)
			onVolumeChange(newVolume)
		} else {
			onVolumeChange(isMuted ? 0 : newVolume)
		}
	}

	const toggleMute = () => {
		if (isMuted) {
			setIsMuted(false)
			setVolume(previousVolume)
			onVolumeChange(previousVolume)
		} else {
			setPreviousVolume(volume)
			setIsMuted(true)
			onVolumeChange(0)
		}
	}

	return (
		<div className="fixed top-4 left-4 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg p-2 z-50">
			<button
				onClick={toggleMute}
				className="text-white hover:text-gray-300 transition-colors"
				aria-label={isMuted ? "音声をオンにする" : "音声をミュートする"}
			>
				<VolumeIcon isMuted={isMuted} volume={volume} />
			</button>
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={isMuted ? 0 : volume}
				onChange={handleVolumeChange}
				className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
				aria-label="音量調整"
			/>
		</div>
	)
}
