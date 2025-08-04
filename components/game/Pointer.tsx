"use client"

interface PointerProps {
	pointer: number[]
	pointerDisplay: "flex" | "none"
	playing: boolean
}

export const Pointer = ({ pointer, pointerDisplay, playing }: PointerProps) => {
	return (
		<div
			className="pointer-item"
			style={{
				left: pointer[0] - 40,
				top: pointer[1] - 40,
				display: playing ? pointerDisplay : "none",
			}}
		>
			<svg className="pointer" width="80" height="80">
				<line x1="20" y1="20" x2="60" y2="60" stroke="red" strokeWidth="8" />
				<line x1="60" y1="20" x2="20" y2="60" stroke="red" strokeWidth="8" />
			</svg>
		</div>
	)
}
