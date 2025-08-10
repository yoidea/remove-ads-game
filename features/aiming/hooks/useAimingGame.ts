"use client"

import { useState, useEffect, useCallback } from "react"
import { SoundName } from "@/hooks/useSound"
import { setColor } from "@/lib/hue"
import { useGame } from "@/hooks/useGame"
import { calcNextButtonSize } from "@/features/aiming/utils/calcButtonSize"

const NUMBER_OF_ADS = 5
const MAX_LIFE = 3
const DEFAULT_BUTTON_SIZE = 20

interface SoundFunctions {
	playSound: (name: SoundName) => void
	stopBGM: () => void
	setBGM: (name: Extract<SoundName, "bgm" | "bgm2">) => void
}

export const useAimingGame = ({
	playSound,
	stopBGM,
	setBGM,
}: SoundFunctions) => {
	const [life, setLife] = useState(MAX_LIFE)
	const [buttonSize, setButtonSize] = useState(DEFAULT_BUTTON_SIZE)
	const [gameClear, setGameClear] = useState(false)
	const [playing, setPlaying] = useState(false)
	const [showOverlay, setShowOverlay] = useState(false)

	// 共通ゲーム状態 (countMistake はこのゲームでは外部に返さない元仕様を維持)
	const {
		countDestroy,
		setCountDestroy,
		countMistake, // 内部利用のみ
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
	} = useGame(NUMBER_OF_ADS)

	const handleGameStart = useCallback(() => {
		setLife(MAX_LIFE)
		setButtonSize(DEFAULT_BUTTON_SIZE)
		setInitialAdOpen(false)
		setGameClear(false)
		setPlaying(true)
		resetCounters()
		setColor("yellow")
		playSound("start")
		setBGM("bgm2")
		openAllModals()
	}, [playSound, setBGM, openAllModals, resetCounters])

	const handleGameClear = useCallback(() => {
		setLife((l) => l - 1)
		setGameClear(true)
		setFullScreenAdOpen(false)
		setPlaying(false)
		closeAllModals()
		playSound("clear")
		stopBGM()
		setColor("red")
		setTimeout(() => setColor("blue"), 500)
	}, [closeAllModals, playSound, stopBGM])

	const regenerateModalsStyle = () => {
		playSound("open")
		setColor("blue")
		setTimeout(() => setColor("yellow"), 500)
		setButtonSize(calcNextButtonSize)
		regenerateModalsStyleBase()
	}

	const handleTapMissArea = () => {
		setCountMistake((m) => m + 1)
		setShowOverlay(false)
		setFullScreenAdOpen(true)
		setLife((l) => l - 1)
		playSound("miss")
		setColor("red")
		setTimeout(() => setColor("yellow"), 500)
	}

	const handleTapButton = () => {
		setColor("green")
		setTimeout(() => setColor("yellow"), 500)
	}

	// ArrowRight でも開始したいので個別にハンドラ（useGame は onStart 未指定のため何もしない）
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.code === "ArrowRight") handleGameStart()
		}
		window.addEventListener("keydown", handler)
		return () => window.removeEventListener("keydown", handler)
	}, [handleGameStart])

	return {
		countDestroy,
		setCountDestroy,
		life,
		buttonSize,
		gameClear,
		playing,
		showOverlay,
		modalsOpen,
		setModalsOpen,
		fullScreenAdOpen,
		setFullScreenAdOpen,
		initialAdOpen,
		modalsStyle,
		handleGameStart,
		handleGameClear,
		handleTapMissArea,
		handleTapButton,
		regenerateModalsStyle,
		NUMBER_OF_ADS,
		MAX_LIFE,
	}
}
