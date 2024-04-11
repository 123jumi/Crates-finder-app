import { EmbedBuilder } from "discord.js";

export const messageFormator = (result) => {
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
			`${result.stats[0].key}: ${result.stats[0].value}\n${result.stats[1].key}: ${result.stats[1].value}\n${result.stats[2].key}: ${result.stats[2].value}`
		)
		.setThumbnail(pic)
		.setTimestamp()
		.setFooter({ text: "This is brought to you by Robots.Fam, made by jumi ✌ " });

	return embed;
};
