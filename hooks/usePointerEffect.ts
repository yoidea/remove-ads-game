import { useState, useEffect } from "react"

export const usePointerEffect = () => {
	const [pointer, setPointer] = useState([0, 0])
	const [pointerDisplay, setPointerDisplay] = useState<"flex" | "none">("none")

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			setPointer([e.clientX, e.clientY])
			setPointerDisplay("flex")
			setTimeout(() => {
				setPointerDisplay("none")
			}, 250)
		}
		window.addEventListener("click", handleClick)
		return () => {
			window.removeEventListener("click", handleClick)
		}
	}, [])

	return { pointer, pointerDisplay }
}
