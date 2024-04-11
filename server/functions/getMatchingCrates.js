// Description: This file contains the code to get the matching crates for the user's items.
export const getMatchingCrates = async (cratesList, userItemsList, min, max) => {
	let combinations = [];
	cratesList.forEach((element) => {
		let counter = 0;
		let level = parseInt(element.id.toString().slice(-2));
		//so the level is between 1 and 20
		level = level > 40 ? level - 40 : level > 20 ? level - 20 : level
		min = isNaN(min)||min< 0 ? 0: min >= 19 ? 19 : min;
		max = max > 20 || max < 0 || isNaN(max) ? 20 : max;
		
		if (level < min || level > max) return
		
		element.stats.forEach((item) => {
			userItemsList.forEach((userItem) => {
				if (item.key == userItem.key && +item.value <= userItem.value) {
					counter++;
				}
			});
		});
		if (counter === 3) {
			combinations.push(
				{
					id: element.id,
					level: level,
					price: element.price / 1e18,
					stats: element.stats, 
				link: `https://element.market/assets/zksync/0xf27e53edc24be11b4c5dc4631fd75ea0ed896d64/${element.id}`
				}
				);
		}
	});
	return combinations.sort((a,b) => a.price - b.price);
};