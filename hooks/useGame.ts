"use client"

import { useState, useEffect, useCallback } from "react"
import { ModalContentStyle } from "@/types"

/**
 * 共通ゲームロジック（ポップアップ広告の生成/配置、開閉状態管理、初期/全画面広告、破壊/ミス回数など）
 */
export interface UseGameOptions {
	onStart?: () => void
	backPath?: string
	maxAdIndex?: number
	maxTopPercent?: number
	maxLeftPercent?: number
}

export interface UseGameReturn {
	countDestroy: number
	setCountDestroy: React.Dispatch<React.SetStateAction<number>>
	countMistake: number
	setCountMistake: React.Dispatch<React.SetStateAction<number>>
	initialAdOpen: boolean
	setInitialAdOpen: React.Dispatch<React.SetStateAction<boolean>>
	fullScreenAdOpen: boolean
	setFullScreenAdOpen: React.Dispatch<React.SetStateAction<boolean>>
	modalsOpen: boolean[]
	setModalsOpen: React.Dispatch<React.SetStateAction<boolean[]>>
	modalsStyle: ModalContentStyle[]
	setModalsStyle: React.Dispatch<React.SetStateAction<ModalContentStyle[]>>
	regenerateModalsStyleBase: () => void
	openAllModals: () => void
	closeAllModals: () => void
	resetCounters: () => void
}

const createRandomNumbers = (count: number, max: number) => {
	const list: number[] = []
	while (list.length < count) {
		const num = Math.floor(Math.random() * max) + 1
		if (!list.includes(num)) list.push(num)
	}
	return list
}

const createRandomStyles = (
	count: number,
	maxAdIndex: number,
	maxTopPercent: number,
	maxLeftPercent: number,
): ModalContentStyle[] => {
	return createRandomNumbers(count, maxAdIndex).map((v) => ({
		content: {
			top: `${Math.random() * maxTopPercent}%`,
			left: `${Math.random() * maxLeftPercent}%`,
			background: `center / contain url('/ads/popup${v}.webp')`,
		},
	}))
}

export const useGame = (
	numberOfAds: number,
	{
		onStart,
		backPath = "/",
		maxAdIndex = 20,
		maxTopPercent = 70,
		maxLeftPercent = 60,
	}: UseGameOptions = {},
): UseGameReturn => {
	const [countDestroy, setCountDestroy] = useState(0)
	const [countMistake, setCountMistake] = useState(0)
	const [initialAdOpen, setInitialAdOpen] = useState(true)
	const [fullScreenAdOpen, setFullScreenAdOpen] = useState(false)
	const [modalsOpen, setModalsOpen] = useState<boolean[]>(() =>
		Array(numberOfAds).fill(false),
	)
	const [modalsStyle, setModalsStyle] = useState<ModalContentStyle[]>(() =>
		createRandomStyles(numberOfAds, maxAdIndex, maxTopPercent, maxLeftPercent),
	)

	const regenerateModalsStyleBase = useCallback(() => {
		setModalsStyle(
			createRandomStyles(
				numberOfAds,
				maxAdIndex,
				maxTopPercent,
				maxLeftPercent,
			),
		)
	}, [numberOfAds, maxAdIndex, maxTopPercent, maxLeftPercent])

	const openAllModals = useCallback(
		() => setModalsOpen(Array(numberOfAds).fill(true)),
		[numberOfAds],
	)
	const closeAllModals = useCallback(
		() => setModalsOpen(Array(numberOfAds).fill(false)),
		[numberOfAds],
	)
	const resetCounters = useCallback(() => {
		setCountDestroy(0)
		setCountMistake(0)
	}, [])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === "ArrowLeft") {
				window.location.href = backPath
			}
			if (e.code === "ArrowRight") {
				onStart?.()
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [onStart, backPath])

	return {
		countDestroy,
		setCountDestroy,
		countMistake,
		setCountMistake,
		initialAdOpen,
		setInitialAdOpen,
		fullScreenAdOpen,
		setFullScreenAdOpen,
		modalsOpen,
		setModalsOpen,
		modalsStyle,
		setModalsStyle,
		regenerateModalsStyleBase,
		openAllModals,
		closeAllModals,
		resetCounters,
	}
}

export default useGame
