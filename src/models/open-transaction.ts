export class OpenTransaction {
	hasOpen: boolean;
	transactionId: number;
	posTransactionId: string;

	constructor(
		hasOpen: boolean,
		transactionId: number,
		posTransactionId: string
	) {
		this.hasOpen = hasOpen;
		this.transactionId = transactionId;
		this.posTransactionId = posTransactionId
	}
}