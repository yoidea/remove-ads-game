"use client"

import { CustomModal } from "@/components/ui/CustomModal"
import { ModalContentStyle } from "@/types"

interface PopupAdsProps {
	modalsStyle: ModalContentStyle[]
	modalsOpen: boolean[]
	handleTapMissArea: () => void
	playSound: (sound: string) => void
	setModalsOpen: (modals: boolean[]) => void
	regenerateModalsStyle: () => void
	handleTapButton: () => void
	setCountDestroy: (count: number) => void
	countDestroy: number
	NUMBER_OF_ADS: number
}

export const PopupAds = ({
	modalsStyle,
	modalsOpen,
	handleTapMissArea,
	playSound,
	setModalsOpen,
	regenerateModalsStyle,
	handleTapButton,
	setCountDestroy,
	countDestroy,
	NUMBER_OF_ADS,
}: PopupAdsProps) => {
	return (
		<>
			{modalsStyle.map((style, key) => (
				<CustomModal
					isOpen={modalsOpen[key]}
					style={style.content}
					overlayClassName="popup-ad-overlay max-w-4xl mx-auto"
					contentClassName="popup-ad-content max-w-4xl mx-auto"
					key={key}
				>
					<div
						onClick={handleTapMissArea}
						style={{ width: "100%", height: "100%" }}
					>
						<button
							onClick={(e: React.MouseEvent) => {
								e.stopPropagation()
								playSound(`close${Math.ceil(Math.random() * 3)}`)
								const prev = [...modalsOpen]
								prev[key] = false
								setModalsOpen(prev)
								const countModalsOpen = modalsOpen.filter(
									(v) => v === true,
								).length
								if (countModalsOpen <= 1) {
									regenerateModalsStyle()
									setModalsOpen([...Array(NUMBER_OF_ADS)].fill(true))
								} else {
									handleTapButton()
								}
								setCountDestroy(countDestroy + 1)
							}}
							className="icon-close"
						>
							☒
						</button>
					</div>
				</CustomModal>
			))}
		</>
	)
}
