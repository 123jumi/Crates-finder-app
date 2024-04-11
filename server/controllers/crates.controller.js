import { itemsToElement, getMatchingCrates } from "../functions/index.js";
import { getAllCrates } from "../queries/crates.queries.js";

export const getCrates = async (req, res) => {
	console.log("Request received:", req.ip);

	const address = req.params.address;
	const minValue = req.params.min || 0;
	const maxValue = req.params.max || 20;
	// comment

	const crates = await getAllCrates();
res.setHeader("Content-Type", "application/json");

if (!address || !minValue || !maxValue) {
	res.json({ message: "Please provide all required parameters." });
} else {
	try {
		let list = await itemsToElement(address);
		let results = await getMatchingCrates(crates, list, minValue, maxValue);
		if (results && results.length > 0) {
			res.status(200).json({ message: results });
		} else {
			throw new Error("No crates found within the specified range.");
		}
	} catch (err) {
		err.message === "No crates found within the specified range."
			? res.json({ error: err.message })
			: res.json({ error: "An error occurred while processing your request." });
	}
}
};
