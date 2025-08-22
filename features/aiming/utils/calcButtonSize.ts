export const calcNextButtonSize = (prev: number): number => {
	const steps = [
		{ threshold: 15, decrement: 5 },
		{ threshold: 7, decrement: 3 },
		{ threshold: 5, decrement: 2 },
		{ threshold: 3, decrement: 1 },
		{ threshold: 2, decrement: 0.5 },
		{ threshold: 1, decrement: 0.2 },
		{ threshold: 0.1, decrement: 0.1 },
	]

	for (const { threshold, decrement } of steps) {
		if (prev > threshold) return parseFloat((prev - decrement).toFixed(1))
	}

	return 0.1
}
