"use client"

import { useEffect, useRef, ReactNode } from "react"
import { ModalStyle } from "@/types"

interface CustomModalProps {
	isOpen: boolean
	onClose?: () => void
	onAfterOpen?: () => void
	style: ModalStyle
	children: ReactNode
}

export const CustomModal = ({
	isOpen,
	onClose,
	onAfterOpen,
	style,
	children,
}: CustomModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isOpen && onAfterOpen) {
			onAfterOpen()
		}
	}, [isOpen, onAfterOpen])

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === modalRef.current && onClose) {
			onClose()
		}
	}

	if (!isOpen) {
		return null
	}

	return (
		<div ref={modalRef} style={style.overlay} onClick={handleOverlayClick}>
			<div style={style.content}>{children}</div>
		</div>
	)
}
