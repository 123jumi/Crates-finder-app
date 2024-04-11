export interface Crate {
	id: number;
	level: number;
	price: number;
	stats: [stats];
	link: string;
}

export interface stats {
	key: string;
	value: number;
}
