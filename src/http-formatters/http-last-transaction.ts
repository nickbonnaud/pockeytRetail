import { LastTransaction } from '../models/last-transaction';

export class HttpLastTransaction {
	private lastTransaction: LastTransaction;

	constructor(httpLastTransaction: any) {
		if (httpLastTransaction.has_recent) {
			this.lastTransaction = new LastTransaction(
				httpLastTransaction.has_recent,
				httpLastTransaction.purchased_items,
				httpLastTransaction.purchased_on,
				httpLastTransaction.tax,
				httpLastTransaction.tip,
				httpLastTransaction.total
			)
		} else {
			this.lastTransaction = new LastTransaction(
				httpLastTransaction.has_recent,
				null,
				null,
				null,
				null,
				null
			)
		}
	}

	getLastTransaction(): LastTransaction {
		return this.lastTransaction;
	}
}