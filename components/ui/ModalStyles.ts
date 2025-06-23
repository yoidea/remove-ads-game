import { ModalStyle } from "@/types"

export const modalStyleBase: ModalStyle = {
	overlay: {
		touchAction: "none",
		pointerEvents: "none",
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0)",
	},
	content: {
		marginTop: "10rem",
		touchAction: "none",
		pointerEvents: "auto",
		position: "absolute",
		width: "300px",
		height: "300px",
		borderRadius: "10px",
		fontSize: "6rem",
		display: "flex",
	},
}

export const iconCloseStyle: React.CSSProperties = {
	fontSize: "2rem",
	position: "absolute",
	top: "0.5rem",
	right: "1rem",
	color: "white",
}

export const iconSkipStyle: React.CSSProperties = {
	fontSize: "2rem",
	position: "absolute",
	width: "8em",
	top: "0.5rem",
	right: "1rem",
	color: "white",
	border: "white",
	background: "rgba(0, 0, 0, 0.5)",
	borderRadius: "4px",
}
