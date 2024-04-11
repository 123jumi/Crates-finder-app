import { connectDB } from "./index.js";
import { createCrate, deleteAllCrates } from "../queries/crates.queries.js";
import fs from "fs";

const crates = JSON.parse(fs.readFileSync("./functions/cratesList.json"));

connectDB(async () => {
	await deleteAllCrates();

	for (const crate of crates) {
		await createCrate(crate);
	}

	console.log("Seeded!");
	process.exit();
});
