import { FC } from "react"

type Props = {
	className?: string
}

export const AlarmClockIcon: FC<Props> = ({ className }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="currentColor"
		className={className}
	>
		<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
		<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
		<path d="M5.88 5.88l-1.76 1.76.7.7 1.76-1.76zM18.12 5.88l-1.76-1.76-.7.7 1.76 1.76z" />
	</svg>
)
