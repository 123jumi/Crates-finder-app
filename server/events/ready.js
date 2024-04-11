import fs from "fs";
import startWebSocketStream from "../webSockets/stream.js";
import { connectDB } from "../database/index.js";
const once = true;
const name = "ready";

async function invoke(client) {
	const commands = fs
		.readdirSync("./events/commands")
		.filter((file) => file.endsWith(".js"))
		.map((file) => file.slice(0, -3));

	const commandsArray = [];

	for (let command of commands) {
		const commandFile = await import(`#commands/${command}`);
		commandsArray.push(commandFile.create());
	}

	client.application.commands.set(commandsArray);

	connectDB(() => console.log(`Successfully logged in as ${client.user.tag}!`));

	startWebSocketStream();
}

export { once, name, invoke };
