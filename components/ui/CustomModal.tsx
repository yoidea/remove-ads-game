"use client"

import { useEffect, useRef, ReactNode } from "react"

interface CustomModalProps {
	isOpen: boolean
	onClose?: () => void
	onAfterOpen?: () => void
	overlayClassName?: string
	contentClassName?: string
	children: ReactNode
	style?: React.CSSProperties
}

export const CustomModal = ({
	isOpen,
	onClose,
	onAfterOpen,
	overlayClassName,
	contentClassName,
	children,
	style,
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
		<div
			ref={modalRef}
			className={overlayClassName || "modal-overlay"}
			onClick={handleOverlayClick}
		>
			<div className={contentClassName || "modal-content"} style={style}>
				{children}
			</div>
		</div>
	)
}
