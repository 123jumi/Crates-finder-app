import axios from "axios"
// Fetch items from the robots.farm API
export const getItems = async (address) => {
	try {
		const response = await axios.get(`https://robots.farm/api/items?owner=${address}`, {
			headers: {
				Accept: "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error(`Error fetching items for address ${address}: ${error}`);
		return null; 
	}
};