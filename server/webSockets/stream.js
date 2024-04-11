import WebSocket from 'ws'
import 'dotenv/config'
import { findCratesInId, updateDB } from "../functions/index.js";
const startWebSocketStream = () => {
	const wss_url = `wss://feeds.element.market/websocket?token=${process.env.API_KEY}`;

	const ws = new WebSocket(wss_url);

	const subscribe_request = {
		method: "SUBSCRIBE",
		topic: "collection:robots-farm-airdrop",
		events: [],
		payload: { chains: ["zkSync"], markets: ["element"] },
	};

	ws.on("open", function open() {
		console.log("Connected");
		ws.send(JSON.stringify(subscribe_request));
	});

	ws.on("message", async function incoming(data) {
		const parsedData = JSON.parse(data);
		const collectionId = parsedData?.payload?.collectionId;

		if (collectionId) {
			try {
				if (collectionId === 5978451) {
					console.log("Received message", parsedData.payload.tokenId);
					const tokenId = parsedData.payload.tokenId;
					if (tokenId && findCratesInId(tokenId)) await updateDB(parsedData);
				}
			} catch (error) {
				console.log("Error processing message:", error);
			}
		}
	});

	ws.on("error", function (error) {
		console.log("WebSocket error:", error);
	});

	ws.on("close", function (code, reason) {
		console.log(`WebSocket closed with code: ${code}, and reason: ${reason}`);
		console.log("Attempting to reconnect...");
		reconnect();
	});
};
const reconnect = () => startWebSocketStream();
export default startWebSocketStream;