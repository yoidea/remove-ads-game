"use client"

import React from "react"
import Image from "next/image"
import { CustomModal } from "@/components/ui/CustomModal"

interface InitialAdProps {
	isOpen: boolean
	onStart: () => void
	type: "speed" | "aiming"
}

export const InitialAd = ({ isOpen, onStart, type }: InitialAdProps) => {
	const ImageSrc =
		type === "speed" ? "/introduction/slide1.png" : "/introduction/slide2.png"

	return (
		<CustomModal
			isOpen={isOpen}
			overlayClassName="initial-ad-overlay"
			contentClassName="initial-ad-content"
		>
			<div style={{ position: "relative", width: "100%", height: "100%" }}>
				<Image
					src={ImageSrc}
					alt="イントロダクション"
					layout="fill"
					objectFit="contain"
				/>
				<button
					className="btn btn-lg start-btn"
					onClick={onStart}
					style={{
						position: "absolute",
						pointerEvents: "auto",
					}}
				>
					チャレンジ開始
				</button>
			</div>
		</CustomModal>
	)
}
