import { SlashCommandBuilder } from "discord.js";

import {
	itemsToElement,
	getMatchingCrates,
	messageFormator,
	isValidAddress,
} from "../../functions/index.js";

import { getAllCrates } from "../../queries/crates.queries.js";

const create = () => {
	const command = new SlashCommandBuilder()
		.setName("findcrates")
		.setDescription("Retrieve crates based on address and value range")
		.addStringOption((option) =>
			option
				.setName("address")
				.setDescription("Your wallet address (starts with 0x)")
				.setRequired(true)
		)
		.addIntegerOption((option) =>
			option.setName("min").setDescription("Minimum crate level").setRequired(true)
		)
		.addIntegerOption((option) =>
			option.setName("max").setDescription("Maximum crate level").setRequired(true)
		);
	return command.toJSON();
};

const invoke = async (interaction) => {
	const address = interaction.options.getString("address");

	if (!isValidAddress(address)) {
		await interaction.reply({
			content:
				"The provided address is invalid. Ensure it starts with '0x' followed by hexadecimal characters.",
			ephemeral: true,
		});
		return;
	}

	const minValue = interaction.options.getInteger("min");
	const maxValue = interaction.options.getInteger("max");
	const crates = await getAllCrates();

	try {
		let list = await itemsToElement(address);
		let results = await getMatchingCrates(crates, list, minValue, maxValue);

		if (results && results.length > 0) {
			let responseMessage = `${results.length} Crates found within the specified range.`;
			await interaction.reply({ content: responseMessage, ephemeral: true });

			for (const result of results) {
				const embed = messageFormator(result);
				await interaction.followUp({ embeds: [embed], ephemeral: true });
			}
		} else {
			await interaction.reply({
				content: "No crates found within the specified range.",
				ephemeral: true,
			});
		}
	} catch (err) {
		console.error("Error processing user response:", err);
		await interaction.reply({
			content: "An error occurred while processing your request.",
			ephemeral: true,
		});
	}
};

export { create, invoke };
