export interface Result {
	[key: string]: {
		total: number
		success: number
	};
}

export interface Totals {
	total: number
	success: number
	fail: number
}