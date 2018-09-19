export class LastTransaction {
	hasRecent: boolean;
	purchasedItems: JSON;
	purchasedOn: Date;
	tax: number;
	tip: number;
	total: number;

	constructor(
		hasRecent: boolean,
		purchasedItems: JSON,
		purchasedOn: Date,
		tax: number,
		tip: number,
		total: number
	) {
		this.hasRecent = hasRecent;
		this.purchasedItems = purchasedItems;
		this.purchasedOn = purchasedOn;
		this.tax = tax;
		this.tip = tip;
		this.total = total;
	}
}