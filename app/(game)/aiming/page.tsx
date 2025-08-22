"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { useAimingGame } from "@/features/aiming/hooks/useAimingGame"
import { usePointerEffect } from "@/hooks/usePointerEffect"
import { useSound } from "@/hooks/useSound"
import { InitialAd } from "@/components/game/InitialAd"
import { PopupAds } from "@/features/aiming/components/PopupAds"
import { FullScreenAd } from "@/components/game/FullScreenAd"
import { ScoreBoard } from "@/components/game/ScoreBoard"
import { Pointer } from "@/components/game/Pointer"
import { VolumeControl } from "@/components/ui/VolumeControl"

export default function AimingPage() {
	const { playSound, stopBGM, setBGM, volume, setVolume } = useSound()

	const {
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
	} = useAimingGame({ playSound, stopBGM, setBGM })

	const { pointer, pointerDisplay } = usePointerEffect()

	return (
		<>
			<VolumeControl
				onVolumeChange={setVolume}
				initialVolume={volume}
				playing={playing}
			/>
			<InitialAd
				isOpen={initialAdOpen}
				onStart={handleGameStart}
				type="aiming"
			/>
			<PopupAds
				modalsStyle={modalsStyle}
				modalsOpen={modalsOpen}
				life={life}
				handleGameClear={handleGameClear}
				handleTapMissArea={handleTapMissArea}
				playSound={playSound}
				setModalsOpen={setModalsOpen}
				regenerateModalsStyle={regenerateModalsStyle}
				handleTapButton={handleTapButton}
				setCountDestroy={setCountDestroy}
				countDestroy={countDestroy}
				buttonSize={buttonSize}
				NUMBER_OF_ADS={NUMBER_OF_ADS}
			/>
			<FullScreenAd
				isOpen={fullScreenAdOpen}
				onClose={() => setFullScreenAdOpen(false)}
				playSound={playSound}
			/>
			<ScoreBoard gameClear={gameClear}>
				<div className="item">
					<div className="life-container">
						<div className="life">
							<span className="life-active">{"♥".repeat(life)}</span>
							<span>{"♥".repeat(MAX_LIFE - life)}</span>
						</div>
						<p>残りライフ</p>
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
							<rect
								id="rect"
								className="timer-rect"
								width="115"
								height="115"
								x="22.5"
								y="22.5"
								transform="rotate(-90, 80, 80)"
								strokeWidth="8"
								stroke="#26a79a"
								fill="none"
							/>
						</svg>
						<div className="size">
							{buttonSize}
							<span style={{ fontSize: "0.5em" }}>mm</span>
						</div>
						<p>ボタンサイズ</p>
					</div>
				</div>
			</ScoreBoard>
			{showOverlay && (
				<div
					className="clear-overlay-box"
					style={{
						background: "center / contain url('/ads/overlay.webp')",
					}}
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
