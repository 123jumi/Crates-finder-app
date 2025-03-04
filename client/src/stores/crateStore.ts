import { defineStore } from "pinia";
import { getSearchResults } from "@/services/index";

import type { Crate } from "../interfaces";
interface CrateState {
	error: any;
	crates: Crate[];
}

export const useCrate = defineStore("crate", {
	state: (): CrateState => ({
		crates: [],
		error: null,
	}),
	getters: {
		getCrateList(): Crate[] {
			return this.crates;
		},

		getError(): string {
			return this.error;
		},
	},
	actions: {
		async fetchSearchResults(address: string, min: number, max: number) {
			try {
				this.crates = await getSearchResults(address, min, max);
				this.error = null;
			} catch (error) {
				this.error = error;
			}
		},

		async setError(error: any) {
			this.error = error;
		},
	},
});
