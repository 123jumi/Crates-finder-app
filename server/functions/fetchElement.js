//seeding functions
import api from "api";
import "dotenv/config";
const sdk = api("@element/v1.0#1kq2oaflsseygo7");
sdk.auth(process.env.API_KEY);

const now = new Date();
const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
const from_time_month = Math.floor(oneMonthAgo.getTime() / 1000);
// main call to fetch events
const getData = async (cursor, event) => {
	try {
		const response = await sdk.assetEvents({
			chain: "zksync",
			contract_address: "0xF27e53EDC24Be11B4C5dc4631Fd75EA0Ed896D64",
			from_time: from_time_month.toString(),
			event_names: event,
			limit: "50",
			cursor: cursor,
		});
		return response.data;
	} catch (err) {
		console.error("Error fetching asset events:", err);
		return null;
	}
};

export const fetchEvents = async (initialCursor, eventType) => {
	let allEvents = [];
	let fetchCount = 0;

	const fetchEventsRecursively = async (cursor) => {
		try {
			const data = await getData(cursor, eventType);
			if (data.data && data.data.assetEventList.length > 0) {
				allEvents.push(...data.data.assetEventList);
				fetchCount += 1;

				if (data.data.pageInfo.hasNextPage === "true") {
					const nextCursor = data.data.pageInfo.endCursor.toString();
					if (fetchCount % 2 === 0)
						await new Promise((resolve) => setTimeout(resolve, 2000));
					if (fetchCount % 100 === 0)
						console.log(`Fetched ${fetchCount} pages of events.`);

					return fetchEventsRecursively(nextCursor);
				} else {
					console.log("Finished fetching all events.");
					console.log(`${allEvents.length} events fetched in total.`);
					const uniqueEvents = filterUniqueEvents(allEvents);
					return uniqueEvents;
				}
			} else {
				console.log("No more data to fetch or reached the end of the dataset.");
				return allEvents;
			}
		} catch (error) {
			console.error("An error occurred during fetching:", error);
			return [];
		}
	};
	return fetchEventsRecursively(initialCursor);
};

const filterUniqueEvents = (events) => {
	const uniqueFilteredEvents = [];
	const seenTokenIds = new Set();

	events.forEach((event) => {
		const tokenId = event.assetEvent.tokenId;
		if (findCratesInId(tokenId) && !seenTokenIds.has(tokenId)) {
			seenTokenIds.add(tokenId);
			uniqueFilteredEvents.push(event);
		}
	});
	console.log(`${uniqueFilteredEvents.length} unique events found.`);
	return uniqueFilteredEvents;
};
// filter for crates
export const findCratesInId = (tokenId) => {
	const lastThreeDigits = parseInt(tokenId.slice(-3));
	return lastThreeDigits >= 200 && lastThreeDigits <= 260;
};
