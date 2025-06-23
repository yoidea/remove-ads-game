import { HUE_BRIDGE_IP, HUE_USER } from "./constants"

const request2hue = (body: any) => {
	const url = `http://${HUE_BRIDGE_IP}/api`
	fetch(`${url}/${HUE_USER}/lights/1/state`, {
		method: "PUT",
		body: JSON.stringify(body),
	})
}

export const setColor = (color: "red" | "green" | "yellow" | "blue") => {
	console.log(`Set color to "${color}"`)
	const value = {
		red: 65403,
		green: 24834,
		yellow: 7377,
		blue: 45610,
	}
	// request2hue({ hue: value[color] })
}
