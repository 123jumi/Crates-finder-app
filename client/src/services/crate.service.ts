import { http } from "@/utils/axios";
import type { Crate } from "../interfaces";
const BASE_URL = "/crates";

// Sends a request to the backend to find restaurants that match the query in the name, description, tags.name or reviews.rating fields.
export async function getSearchResults(
	address: string,
	min: number,
	max: number
): Promise<Crate[]> {
	const url = `${BASE_URL}/${address}/${min}/${max}`;
	const response = await http.get(url);
	if (!response.data.error) {
		return response.data.message;
	} else {
		throw new Error(response.data.error);
	}
}
