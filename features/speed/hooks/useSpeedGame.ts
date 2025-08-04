"use client"
import { useState, useEffect } from "react"
import { useTimer } from "react-timer-hook"
import { useSound } from "@/hooks/useSound"
import { setColor } from "@/lib/hue"
import { ModalContentStyle } from "@/types"

const NUMBER_OF_ADS = 10
const TIMER_SECONDS = 30

export const useSpeedGame = () => {
	const { playSound, stopBGM, setBGM } = useSound()
	const [countDestroy, setCountDestroy] = useState(0)
	const [countMistake, setCountMistake] = useState(0)
	const [gameClear, setGameClear] = useState(false)
	const [playing, setPlaying] = useState(false)
	const [showOverlay, setShowOverlay] = useState(false)
	const [modalsOpen, setModalsOpen] = useState<boolean[]>(
		[...Array(NUMBER_OF_ADS)].fill(false),
	)
	const [fullScreenAdOpen, setFullScreenAdOpen] = useState<boolean>(false)
	const [initialAdOpen, setInitialAdOpen] = useState<boolean>(true)

	const ramdomList: number[] = []
	while (ramdomList.length < NUMBER_OF_ADS) {
		const num = Math.floor(Math.random() * 20) + 1
		if (!ramdomList.includes(num)) ramdomList.push(num)
	}

	const [modalsStyle, setModalsStyle] = useState<ModalContentStyle[]>(
		ramdomList.map((v) => ({
			content: {
				top: `${Math.random() * 70}%`,
				left: `${Math.random() * 60}%`,
				background: `center / contain url('/ads/popup${v}.webp')`,
			},
		})),
	)

	const expiryTimestamp = new Date()
	expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + TIMER_SECONDS)

	const { seconds, restart } = useTimer({
		expiryTimestamp,
		onExpire: () => handleGameClear(),
		autoStart: false,
	})

	const handleGameStart = () => {
		setInitialAdOpen(false)
		setGameClear(false)
		setPlaying(true)
		const expiryTimestamp = new Date()
		expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + TIMER_SECONDS)
		restart(expiryTimestamp)
		setCountDestroy(0)
		setCountMistake(0)
		setColor("yellow")
		playSound("start")
		setBGM("bgm")
		setModalsOpen([...Array(NUMBER_OF_ADS)].fill(true))
	}

	const handleGameClear = () => {
		setGameClear(true)
		setFullScreenAdOpen(false)
		setPlaying(false)
		setModalsOpen([...Array(NUMBER_OF_ADS)].fill(false))
		playSound("clear")
		stopBGM()
		setColor("green")
		setTimeout(() => {
			setColor("blue")
		}, 500)
	}

	const regenerateModalsStyle = () => {
		const ramdomList: number[] = []
		while (ramdomList.length < NUMBER_OF_ADS) {
			const num = Math.floor(Math.random() * 20) + 1
			if (!ramdomList.includes(num)) ramdomList.push(num)
		}
		playSound("open")
		setShowOverlay(true)
		setTimeout(setShowOverlay, 3000, false)
		setColor("blue")
		setTimeout(setColor, 500, "yellow")
		const newModalsStyle = ramdomList.map((v) => ({
			content: {
				top: `${Math.random() * 70}%`,
				left: `${Math.random() * 60}%`,
				background: `center / contain url('/ads/popup${v}.webp')`,
			},
		}))
		setModalsStyle(newModalsStyle)
	}

	const handleTapMissArea = () => {
		setCountMistake(countMistake + 1)
		setShowOverlay(false)
		setFullScreenAdOpen(true)
		playSound("miss")
		setColor("red")
	}

	const handleTapButton = () => {
		setColor("green")
		setTimeout(() => {
			setColor("yellow")
		}, 500)
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === "ArrowLeft") {
				window.location.href = "/"
			}
			if (e.code === "ArrowRight") {
				handleGameStart()
			}
		}
		window.addEventListener("keydown", handleKeyDown)
		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [])

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
		playSound,
		TIMER_SECONDS,
		NUMBER_OF_ADS,
	}
}
