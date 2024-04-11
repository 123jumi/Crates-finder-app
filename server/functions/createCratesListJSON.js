import { fetchEvents } from "./fetchElement.js"
import { checkCratesInList } from "./fetchCratesItems.js"

export const createCratesListJSON = async () => {
	try {
		// Fetch the list and sale events the rate limit is handle in the functions
		let [list, sale] = await Promise.all([
			fetchEvents("MA==", "List"),
			fetchEvents("MA==", "Sale"),
		]);

		if (list && sale) {
			await checkCratesInList(list, sale);
		} else {
			console.log(list, sale);
			console.log("One or both of the fetchEvents calls returned no data.");
		}
	} catch (error) {
		// Handle any errors that occurred during fetch operations or checking
		console.error("Error fetching or checking crates:", error);
	}
};