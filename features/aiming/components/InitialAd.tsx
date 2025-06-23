"use client"
import React from "react"
import { CustomModal } from "@/components/ui/CustomModal"
import { modalStyleBase } from "@/components/ui/ModalStyles"

interface InitialAdProps {
	isOpen: boolean
	onStart: () => void
}

export const InitialAd = ({ isOpen, onStart }: InitialAdProps) => {
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
					background: "url('/introduction/slide2.png')",
					backgroundSize: "cover",
				},
			}}
		>
			<div style={{ width: "100%", height: "100%" }}>
				<button className="btn btn-lg mb-3 start-btn" onClick={onStart}>
					チャレンジ開始
				</button>
			</div>
		</CustomModal>
	)
}
