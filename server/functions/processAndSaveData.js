import fs from "fs"
import path from "path"
// data to json

export const processAndSaveData = (data, filename) => {
	// Prepare the data by only including up to the last three stats for each ID
	const processedData = data.map(({ id, price, stats }) => ({
		id,
		price,
		stats: stats.slice(-3).map(({ key, value }) => ({
			key,
			value,
		})),
	}));

	const jsonContent = JSON.stringify(processedData, null, 2);

	fs.writeFile(path.join(__dirname, filename), jsonContent, { encoding: "utf8" }, (err) => {
		if (err) {
			console.error("Error saving data:", err);
			return;
		}
		console.log(`${filename} was saved successfully.`);
	});
};