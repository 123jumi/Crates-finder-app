import { itemsToElement } from "./functions/itemsToElement.js"
import { getMatchingCrates } from "./functions/getMatchingCrates.js"
import { createCratesListJSON } from "./functions/createCratesListJSON.js"
import { Client, GatewayIntentBits, Partials, EmbedBuilder } from "discord.js"
import fs from 'fs'
import 'dotenv/config'

const crates = JSON.parse(fs.readFileSync('./functions/cratesList.json'))
//need to be change for the robots.farm guild
const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
	],
	partials: [Partials.Channel],
});

client.on("ready", async (c) => {
	await createCratesListJSON();
	// Refresh the crates list every 90 minutes for rate limiting
	setInterval(createCratesListJSON, 90 * 60 * 1000);
});
//prefix for the bot could be change for slash commands
const prefix = "$";

client.on("messageCreate", async msg => {
	
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	// Command to get crates based on user input
	if (command === "getcrates") {
		await msg.channel.send("Please write $ followed by your address. Example: $0x1234567890abcdef1234567890abcdef12345678");

		const filter = response => response.author.id === msg.author.id;
		const options = { filter, max: 1, time: 60000 };
		let address, minValue, maxValue;

// Collecting address need some error handling
		const addressCollector = msg.channel.createMessageCollector(options);
		addressCollector.on('collect', async (m) => {
			if (!m.content.startsWith("$")) {
				await msg.channel.send("Address must start with $. Please try again.");
				addressCollector.stop();
				return;
			}
			address = m.content.slice(1).trim();
			await msg.channel.send(`Address received: ${address}. Now, please send the minimum level of crates.`);
			addressCollector.stop();

			// Collecting minimum value
			const minCollector = msg.channel.createMessageCollector(options);
			minCollector.on('collect', async (minMsg) => {
				if (isNaN(minMsg.content) || minMsg.content.trim() < 0) {
					await msg.channel.send("Invalid minimum level of crates. Please ensure it's a non-negative number.");
					minCollector.stop();
					return;
				}
				minValue = minMsg.content.trim();
				await msg.channel.send(`Minimum level of crates received: ${minValue}. Now, please send the maximum level of crates.`);
				minCollector.stop();

				// Collecting maximum value
				const maxCollector = msg.channel.createMessageCollector(options);
				maxCollector.on('collect', async (maxMsg) => {
					if (isNaN(maxMsg.content) || Number(maxMsg.content.trim()) < Number(minValue)) {
						await msg.channel.send("Invalid maximum level of crates. Please ensure it's a number greater than or equal to the minimum level of crates.");
						maxCollector.stop();
						return;
					}
					maxValue = maxMsg.content.trim();
					await msg.channel.send(`All values received. Address: ${address}, Min: ${minValue}, Max: ${maxValue}.`);
					maxCollector.stop();

					// Processing the data with collected values
					try {
						let list = await itemsToElement(address); 
						let results = await getMatchingCrates(crates, list, minValue, maxValue); 
						if (results.length > 0) {
							
							await msg.channel.send(`${results.length} Crates found within the specified range.`);
							results.forEach(async (result) => {
								const embed = messageFormator(result);
								await msg.channel.send({ embeds: [embed] }); 
							});
							msg.channel.send("Crates found within the specified range.");
						} else {
							await msg.channel.send("No crates found within the specified range.");
						}
					} catch (err) {
						console.error("Error processing user response:", err);
						await msg.channel.send("An error occurred while processing your request.");
					}
				});
			});
		});
	}
})



// format the message
const messageFormator = (result) => {
	const pic =
		+result.level >= 16
			? "https://robots.farm/items/crate-big-s3.webp"
			: +result.level >= 10
			? "https://robots.farm/items/crate-medium-s3.webp"
			: "https://robots.farm/items/crate-small-s3.webp";
	const embed = new EmbedBuilder()
		.setColor("#0099ff")
		.setTitle(
			`Crate level: ${result.level} Price: ${result.price} eth click here to buy on element!`
		)
		.setURL(`${result.link}`)
		.setAuthor({ name: "Robots.Farm Crates Finder" })
		.setDescription(
			`${result.stats[0].key}: ${result.stats[0].value}\n${result.stats[1].key}: ${result.stats[1].value}	\n${result.stats[2].key}: ${result.stats[2].value}`
		)
		.setThumbnail(pic)
		.setTimestamp()
		.setFooter({ text: "This is brought to you by Robots.Fam, made by jumi ✌ " });

	return embed;}

const auth_token = process.env.TOKEN
client.login(auth_token);