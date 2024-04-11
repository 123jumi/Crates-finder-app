import api from "api";
import "dotenv/config";
import { processAndSaveData } from "../functions/processAndSaveData.js";

const sdk = api("@element/v1.0#1kq2oaflsseygo7");
sdk.auth(process.env.API_KEY);

// Helper function for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const errorIds = [];

export const fetchAssetDetails = async (crate, rerunErrors, payload = false) => {
	try {
		const response = await sdk.assetsDetail({
			chain: "zksync",
			contract_address: "0xf27e53edc24be11b4c5dc4631fd75ea0ed896d64",
			token_id: payload
				? crate.payload.tokenId.toString()
				: crate.assetEvent.tokenId.toString(),
		});
		if (response.data.data.stats)
			return {
				id: payload ? crate.payload.tokenId : crate.assetEvent.tokenId,
				price: payload ? crate.payload.price : crate.assetEvent.price,
				stats: response.data.data.stats,
			};
	} catch (err) {
		if (rerunErrors) {
			errorIds.push(crate.assetEvent.tokenId);
		}
		if (payload) console.log(`Error fetching asset details for ID: ${crate.payload.tokenId}`);
		else console.log(`Error fetching asset details for ID: ${crate.assetEvent.tokenId}`);
		return null; // Return null in case of error to filter out later
	}
};

const removeSaleItems = (idsList, idsSaleList) => {
	const idsSaleSet = new Set(idsSaleList.map((id) => parseInt(id.assetEvent.tokenId)));

	const filteredList = idsList.filter((item) => {
		const itemId = parseInt(item.assetEvent.tokenId);
		return !idsSaleSet.has(itemId);
	});

	return filteredList;
};

export const checkCratesInList = async (idsList, idsSale) => {
	const ids = idsSale
		? removeSaleItems(idsList, idsSale)
		: idsList.map((id) => parseInt(id.assetEvent.tokenId));

	const statsWithIds = [];
	let rerunErrors = true;

	// Extracted logic for fetching asset details
	const fetchDetails = async (idsArray) => {
		for (let i = 0; i < idsArray.length; i++) {
			const crate = idsArray[i];

			const result = await fetchAssetDetails(crate, rerunErrors).catch(() =>
				errorIds.push(crate)
			);
			if (result) statsWithIds.push(result);

			if (i % 2 === 0) {
				await delay(800); // Wait for 0.8 second between requests for rate limiting
			}
		}
	};

	// second chance for errors just in case
	await fetchDetails(ids);
	if (errorIds.length > 0 && rerunErrors) {
		rerunErrors = false;
		console.log("Retrying for errors...");
		await fetchDetails(errorIds);
	}
	// process and save the data it could save on different file in case of error
	// sometimes send an empty list instead that could be problematic, fix with mongodb
	if (statsWithIds.length > 0) processAndSaveData(statsWithIds, "cratesList.json");
};
