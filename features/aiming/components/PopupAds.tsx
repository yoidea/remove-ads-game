"use client"

import { CustomModal } from "@/components/ui/CustomModal"
import { iconCloseStyle } from "@/components/ui/ModalStyles"

interface PopupAdsProps {
	modalsStyle: any[]
	modalsOpen: boolean[]
	life: number
	handleGameClear: () => void
	handleTapMissArea: () => void
	playSound: (sound: string) => void
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
				<CustomModal isOpen={modalsOpen[key]} style={style} key={key}>
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
							style={{
								...iconCloseStyle,
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
