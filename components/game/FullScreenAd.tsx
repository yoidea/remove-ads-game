"use client"

import { useState, useEffect } from "react"
import { CustomModal } from "@/components/ui/CustomModal"
import { modalStyleBase, iconSkipStyle } from "@/components/ui/ModalStyles"
import { setColor } from "@/lib/hue"

interface FullScreenAdProps {
	isOpen: boolean
	onClose: () => void
	playSound: (sound: string) => void
}

export const FullScreenAd = ({
	isOpen,
	onClose,
	playSound,
}: FullScreenAdProps) => {
	const [buttonText, setButtonText] = useState("2秒後にスキップ")
	const [buttonEnabled, setButtonEnabled] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setButtonText("2秒後にスキップ")
			setButtonEnabled(false)
			const timer1 = setTimeout(() => setButtonText("1秒後にスキップ"), 1000)
			const timer2 = setTimeout(() => {
				setButtonText("広告をスキップ")
				setButtonEnabled(true)
				setColor("green")
			}, 2000)

			return () => {
				clearTimeout(timer1)
				clearTimeout(timer2)
			}
		}
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

	return (
		<CustomModal
			isOpen={isOpen}
			style={{
				overlay: {
					...modalStyleBase.overlay,
					pointerEvents: "auto",
					backgroundColor: "rgba(0,0,0,0.5)",
				},
				content: {
					...modalStyleBase.content,
					top: "4rem",
					left: "4rem",
					right: "4rem",
					bottom: "4rem",
					width: "85%",
					height: "75%",
					background: "url('/ads/rainbow.webp')",
					backgroundSize: "cover",
				},
			}}
		>
			<div style={{ width: "100%", height: "100%" }}>
				<button
					onClick={(e) => {
						e.stopPropagation()
						handleClose()
					}}
					style={iconSkipStyle}
				>
					{buttonText}
				</button>
				<img className="cat" src="/ads/cat1.webp" alt="猫" />
			</div>
		</CustomModal>
	)
}
