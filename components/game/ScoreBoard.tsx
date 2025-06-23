"use client"

import { ReactNode } from "react"

interface ScoreBoardProps {
	gameClear: boolean
	children: ReactNode
}

export const ScoreBoard = ({ gameClear, children }: ScoreBoardProps) => {
	return (
		<div
			className={`${
				gameClear ? "score-board score-board-wrap" : "score-board"
			}`}
		>
			{children}
		</div>
	)
}
