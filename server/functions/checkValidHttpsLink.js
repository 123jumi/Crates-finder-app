import https from "https"

export const checkValidHttpsLink = (url) =>
	new Promise((resolve) => {
		https
			.get(url, (res) => {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(true);
				} else {
					resolve(false);
				}
			})
			.on("error", () => {
				resolve(false);
			});
});