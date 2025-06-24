"use client"

import React from "react"
import Image from "next/image"
import { CustomModal } from "@/components/ui/CustomModal"
import { AlarmClockIcon } from "@/components/icons/AlarmClockIcon"
import { HeartIcon } from "@/components/icons/HeartIcon"

interface InitialAdProps {
	isOpen: boolean
	onStart: () => void
	type: "speed" | "aiming"
}

export const InitialAd = ({ isOpen, onStart, type }: InitialAdProps) => {
	const content = Content[type]

	return (
		<CustomModal
			isOpen={isOpen}
			overlayClassName="initial-ad-overlay max-w-4xl mx-auto"
			contentClassName="initial-ad-content max-w-4xl mx-auto"
		>
			<div style={{ width: "100%", height: "100%", backgroundColor: "yellow" }}>
				<button className="btn btn-lg mb-3 start-btn" onClick={onStart}>
					チャレンジ開始
				</button>
			</div>
		</CustomModal>
	)
}

const Content = {
	speed: {
		title: "速さチャレンジ",
		limit: "30秒",
		descriptionTitle: "時間内にいくつ広告を閉じられるかに挑戦",
		descriptionList: [
			"バツボタンを押すと広告が閉じます",
			"広告バナーに触れてしまうとペナルティ",
		],
	},
	aiming: {
		title: "細かさチャレンジ",
		limit: "3ライフ",
		descriptionTitle: "どこまで小さいバツボタンを押せるかに挑戦",
		descriptionList: [
			"バツボタンを押すと広告が閉じます",
			"5個閉じる毎にボタンサイズが小さくなります",
			"広告バナーに触れてしまうとライフが減ります",
		],
	},
}
