"use client"

import { useState, useEffect } from "react"
import { setColor } from "@/lib/hue"
import { ModalContentStyle } from "@/types"

const NUMBER_OF_ADS = 5
const MAX_LIFE = 3
const DEFAULT_BUTTON_SIZE = 20

interface SoundFunctions {
	playSound: (name: string) => void
	stopBGM: () => void
	setBGM: (name: string) => void
}

export const useAimingGame = ({
	playSound,
	stopBGM,
	setBGM,
}: SoundFunctions) => {
	const [countDestroy, setCountDestroy] = useState(0)
	const [countMistake, setCountMistake] = useState(0)
	const [life, setLife] = useState(MAX_LIFE)
	const [buttonSize, setButtonSize] = useState(DEFAULT_BUTTON_SIZE)
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

	const handleGameStart = () => {
		setLife(MAX_LIFE)
		setButtonSize(DEFAULT_BUTTON_SIZE)
		setInitialAdOpen(false)
		setGameClear(false)
		setPlaying(true)
		setCountDestroy(0)
		setCountMistake(0)
		setColor("yellow")
		playSound("start")
		setBGM("bgm2")
		setModalsOpen([...Array(NUMBER_OF_ADS)].fill(true))
	}

	const handleGameClear = () => {
		setLife(life - 1)
		setGameClear(true)
		setFullScreenAdOpen(false)
		setPlaying(false)
		setModalsOpen([...Array(NUMBER_OF_ADS)].fill(false))
		playSound("clear")
		stopBGM()
		setColor("red")
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
		setColor("blue")
		setTimeout(() => {
			setColor("yellow")
		}, 500)
		if (buttonSize > 15) {
			setButtonSize(buttonSize - 5)
		} else if (buttonSize > 7) {
			setButtonSize(buttonSize - 3)
		} else if (buttonSize > 5) {
			setButtonSize(buttonSize - 2)
		} else if (buttonSize > 3) {
			setButtonSize(buttonSize - 1)
		} else if (buttonSize > 2) {
			setButtonSize((buttonSize * 10 - 5) / 10)
		} else if (buttonSize > 1) {
			setButtonSize((buttonSize * 10 - 2) / 10)
		} else if (buttonSize > 0.1) {
			setButtonSize((buttonSize * 10 - 1) / 10)
		} else {
			setButtonSize(0.1)
		}
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
		setLife(life - 1)
		playSound("miss")
		setColor("red")
		setTimeout(() => {
			setColor("yellow")
		}, 500)
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
