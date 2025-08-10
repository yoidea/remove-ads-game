"use client"

import { CustomModal } from "@/components/ui/CustomModal"
import { SoundName } from "@/hooks/useSound"
import { ModalContentStyle } from "@/types"

interface PopupAdsProps {
	modalsStyle: ModalContentStyle[]
	modalsOpen: boolean[]
	life: number
	handleGameClear: () => void
	handleTapMissArea: () => void
	playSound: (sound: SoundName) => void
	setModalsOpen: (modals: boolean[]) => void
	regenerateModalsStyle: () => void
	handleTapButton: () => void
	setCountDestroy: (count: number) => void
	countDestroy: number
	buttonSize: number
	NUMBER_OF_ADS: number
}

export const PopupAds = ({
	modalsStyle,
	modalsOpen,
	life,
	handleGameClear,
	handleTapMissArea,
	playSound,
	setModalsOpen,
	regenerateModalsStyle,
	handleTapButton,
	setCountDestroy,
	countDestroy,
	buttonSize,
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
						onClick={() => {
							if (life <= 1) {
								handleGameClear()
							} else {
								handleTapMissArea()
							}
						}}
						style={{ width: "100%", height: "100%" }}
					>
						<button
							onClick={(e) => {
								e.stopPropagation()
								playSound(`close${Math.ceil(Math.random() * 3)}` as SoundName)
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
							style={{
								fontSize: `${buttonSize}mm`,
								top: `${((20 - buttonSize) / 20) * 4}mm`,
								right: "4.25mm",
							}}
						>
							☒
						</button>
					</div>
				</CustomModal>
			))}
		</>
	)
}
