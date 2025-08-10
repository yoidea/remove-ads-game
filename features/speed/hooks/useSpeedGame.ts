"use client"
import { useState, useEffect, useCallback } from "react"
import { useTimer } from "react-timer-hook"
import { setColor } from "@/lib/hue"
import { useGame } from "@/hooks/useGame"

const NUMBER_OF_ADS = 10
const TIMER_SECONDS = 30

interface SoundFunctions {
	playSound: (name: string) => void
	stopBGM: () => void
	setBGM: (name: string) => void
}

export const useSpeedGame = ({
	playSound,
	stopBGM,
	setBGM,
}: SoundFunctions) => {
	const [gameClear, setGameClear] = useState(false)
	const [playing, setPlaying] = useState(false)
	const [showOverlay, setShowOverlay] = useState(false)
	const {
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
		regenerateModalsStyleBase,
		openAllModals,
		closeAllModals,
		resetCounters,
	} = useGame(NUMBER_OF_ADS)

	const expiryTimestamp = new Date()
	expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + TIMER_SECONDS)

	const { seconds, restart } = useTimer({
		expiryTimestamp,
		onExpire: () => handleGameClear(),
		autoStart: false,
	})

	const handleGameStart = useCallback(() => {
		setInitialAdOpen(false)
		setGameClear(false)
		setPlaying(true)
		const expiryTimestamp = new Date()
		expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + TIMER_SECONDS)
		restart(expiryTimestamp)
		resetCounters()
		setColor("yellow")
		playSound("start")
		setBGM("bgm")
		openAllModals()
	}, [playSound, setBGM, restart, openAllModals, resetCounters])

	const handleGameClear = useCallback(() => {
		setGameClear(true)
		setFullScreenAdOpen(false)
		setPlaying(false)
		closeAllModals()
		playSound("clear")
		stopBGM()
		setColor("green")
		setTimeout(() => setColor("blue"), 500)
	}, [closeAllModals, playSound, stopBGM])

	const regenerateModalsStyle = () => {
		playSound("open")
		setShowOverlay(true)
		setTimeout(setShowOverlay, 3000, false)
		setColor("blue")
		setTimeout(() => setColor("yellow"), 500)
		regenerateModalsStyleBase()
	}

	const handleTapMissArea = () => {
		setCountMistake((m) => m + 1)
		setShowOverlay(false)
		setFullScreenAdOpen(true)
		playSound("miss")
		setColor("red")
	}

	const handleTapButton = () => {
		setColor("green")
		setTimeout(() => setColor("yellow"), 500)
	}

	// ArrowRight でも開始（useGame は onStart 未指定）
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
		countMistake,
		gameClear,
		playing,
		showOverlay,
		modalsOpen,
		setModalsOpen,
		fullScreenAdOpen,
		setFullScreenAdOpen,
		initialAdOpen,
		modalsStyle,
		seconds,
		handleGameStart,
		handleTapMissArea,
		handleTapButton,
		regenerateModalsStyle,
		TIMER_SECONDS,
		NUMBER_OF_ADS,
	}
}
