"use client"

import { useState, useEffect } from "react"
import { CustomModal } from "@/components/ui/CustomModal"
import { setColor } from "@/lib/hue"
import { SoundName } from "@/hooks/useSound"

interface FullScreenAdProps {
	isOpen: boolean
	onClose: () => void
	playSound: (sound: SoundName) => void
}

export const FullScreenAd = ({
	isOpen,
	onClose,
	playSound,
}: FullScreenAdProps) => {
	const [secondsLeft, setSecondsLeft] = useState(2)
	const [buttonEnabled, setButtonEnabled] = useState(false)

	useEffect(() => {
		if (!isOpen) return
		setSecondsLeft(2)
		setButtonEnabled(false)
		let current = 2
		const id = setInterval(() => {
			current -= 1
			if (current <= 0) {
				setSecondsLeft(0)
				setButtonEnabled(true)
				setColor("green")
				clearInterval(id)
			} else {
				setSecondsLeft(current)
			}
		}, 1000)
		return () => clearInterval(id)
	}, [isOpen])

	const handleClose = () => {
		if (!buttonEnabled) {
			playSound("miss")
			return
		}
		onClose()
		playSound("close4")
		setColor("yellow")
	}

	const buttonText = buttonEnabled
		? "広告をスキップ"
		: `${secondsLeft}秒後にスキップ`

	return (
		<CustomModal
			isOpen={isOpen}
			overlayClassName="fullscreen-ad-overlay mx-auto"
			contentClassName="fullscreen-ad-content max-w-3xl"
			style={{
				background: "url('/ads/rainbow.webp')",
				backgroundSize: "cover",
			}}
		>
			<div className="h-full max-w-4xl mx-auto">
				<button
					onClick={(e) => {
						e.stopPropagation()
						handleClose()
					}}
					className="icon-skip text-md md:text-3xl"
				>
					{buttonText}
				</button>
				<img className="cat w-[40%]" src="/ads/cat1.webp" alt="猫" />
			</div>
		</CustomModal>
	)
}
