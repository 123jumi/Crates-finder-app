import { findCrate, createCrate, deleteCrate, updateCrate } from "../queries/crates.queries.js";
import { fetchAssetDetails } from "./index.js";

export const updateDB = async (data) => {
	try {
		let dbCrate = await findCrate(+data.payload.tokenId);
		let eventName = data.payload.eventName;
		console.log("Event name:", eventName);
		if (dbCrate) {
			if (eventName === "Sale" || eventName === "Cancel" || eventName === "Transfer") {
				await deleteCrate(dbCrate._id);
				console.log("Delete crate in the database");
			} else {
				if (eventName === "List") {
					let crate = {
						_id: dbCrate._id,
						id: dbCrate.id,
						price: +data.payload.price,
						stats: dbCrate.stats,
					};

					await updateCrate(dbCrate._id, crate);
					console.log("Updated crate in the database");
				}
			}
		} else {
			if (eventName === "List") {
				let crate = await fetchAssetDetails(data, false, true);

				if (crate) {
					const processedData = {
						id: +crate.id,
						price: +crate.price,
						stats: crate.stats.slice(-3).map(({ key, value }) => ({
							key,
							value,
						})),
					};
					await createCrate(processedData);
					console.log("Create crate in the database");
				}
			}
		}
	} catch (error) {
		console.error("Error updating the database:", error);
	}
};
