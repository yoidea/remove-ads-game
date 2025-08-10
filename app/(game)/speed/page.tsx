"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { useSpeedGame } from "@/features/speed/hooks/useSpeedGame"
import { usePointerEffect } from "@/hooks/usePointerEffect"
import { useSound } from "@/hooks/useSound"
import { InitialAd } from "@/components/game/InitialAd"
import { PopupAds } from "@/features/speed/components/PopupAds"
import { FullScreenAd } from "@/components/game/FullScreenAd"
import { ScoreBoard } from "@/components/game/ScoreBoard"
import { Pointer } from "@/components/game/Pointer"
import { VolumeControl } from "@/components/ui/VolumeControl"

export default function SpeedPage() {
	const { playSound, stopBGM, setBGM, volume, setVolume } = useSound()

	const {
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
	} = useSpeedGame({ playSound, stopBGM, setBGM })

	const { pointer, pointerDisplay } = usePointerEffect()

	return (
		<>
			<VolumeControl onVolumeChange={setVolume} initialVolume={volume} playing={playing} />
			<InitialAd
				isOpen={initialAdOpen}
				onStart={handleGameStart}
				type="speed"
			/>
			<PopupAds
				modalsStyle={modalsStyle}
				modalsOpen={modalsOpen}
				handleTapMissArea={handleTapMissArea}
				playSound={playSound}
				setModalsOpen={setModalsOpen}
				regenerateModalsStyle={regenerateModalsStyle}
				handleTapButton={handleTapButton}
				setCountDestroy={setCountDestroy}
				countDestroy={countDestroy}
				NUMBER_OF_ADS={NUMBER_OF_ADS}
			/>
			<FullScreenAd
				isOpen={fullScreenAdOpen}
				onClose={() => setFullScreenAdOpen(false)}
				playSound={playSound}
			/>
			<ScoreBoard gameClear={gameClear}>
				<div className="item">
					<div className="timer-container">
						<svg viewBox="0 0 160 160" width="100%" height="100%">
							<circle
								id="circle"
								className="timer-circle"
								r="60"
								cy="80"
								cx="80"
								transform="rotate(270, 80, 80)"
								strokeDasharray="377"
								strokeDashoffset={`${-376 * (seconds / TIMER_SECONDS)}`}
								strokeWidth="8"
								stroke="#26a79a"
								fill="none"
							/>
						</svg>
						<div className="timer-time">{seconds}</div>
						<p>残り時間</p>
					</div>
				</div>
				<div className="item">
					<div className="timer-container">
						<svg viewBox="0 0 160 160" width="100%" height="100%">
							<circle
								id="circle"
								className="timer-circle"
								r="60"
								cy="80"
								cx="80"
								transform="rotate(-90, 80, 80)"
								strokeDasharray="377"
								strokeDashoffset="0"
								strokeWidth="8"
								stroke="#3f51b5"
								fill="none"
							/>
						</svg>
						<div className="timer-time">{countDestroy}</div>
						<p>消した広告</p>
					</div>
				</div>
				<div className="item">
					<div className="timer-container">
						<svg viewBox="0 0 160 160" width="100%" height="100%">
							<circle
								id="circle"
								className="timer-circle"
								r="60"
								cy="80"
								cx="80"
								transform="rotate(-90, 80, 80)"
								strokeDasharray="377"
								strokeDashoffset="0"
								strokeWidth="8"
								stroke="#e91e63"
								fill="none"
							/>
						</svg>
						<div className="timer-time">
							{(() => {
								const missRate = Math.round(
									(countMistake * 100) / (countDestroy + countMistake),
								)
								return Number.isNaN(missRate) ? 0 : missRate
							})()}
						</div>
						<p>ミス率%</p>
					</div>
				</div>
			</ScoreBoard>
			{showOverlay && (
				<div
					className="overlay-box"
					style={{
						background: "center / contain url('/ads/overlay.webp')",
					}}
					onClick={handleTapMissArea}
				></div>
			)}
			{gameClear && (
				<>
					<button
						className="btn btn-warning btn-lg mb-3 score-board-btn2"
						onClick={() => {
							window.location.href = "/"
						}}
					>
						トップに戻る
					</button>
					<button
						className="btn btn-primary btn-lg mb-3 score-board-btn"
						onClick={handleGameStart}
					>
						もう一度チャレンジ
					</button>
				</>
			)}
			<Pointer
				pointer={pointer}
				pointerDisplay={pointerDisplay}
				playing={playing}
			/>
		</>
	)
}
