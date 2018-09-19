export class Deal {
	hasDeal: boolean;
	dealId: number;
	dealItem: string;

	constructor(
		hasDeal: boolean,
		dealId: number,
		dealItem: string
	) {
		this.hasDeal = hasDeal;
		this.dealId = dealId;
		this.dealItem = dealItem
	}
}