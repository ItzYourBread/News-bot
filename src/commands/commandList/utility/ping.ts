import { Client, CommandInteraction} from "eris"

export default {
	data: {
		name: "ping",
		description: "Ping pong"
	},
	run: async (client: Client, interaction: CommandInteraction) => {
		console.log("Hello!")
	}
}