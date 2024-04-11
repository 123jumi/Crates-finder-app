import { getItems } from "./getItems.js"
import { items } from "../lists/items.js"
// Description: This file contains the code to convert the user's items to an element format
export const itemsToElement = async (address) => {
	const list = [];
	const userItems = await getItems(address);
	if (userItems) {
		userItems.forEach((userItem) => {
			items.forEach((item) => {
				if (userItem.ItemType == item.number) {
					list.push({ key: item.ItemType, value: userItem.Count });
				}
			});
		});
	}
	return list;
};