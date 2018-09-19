import { OpenTransaction } from '../models/open-transaction';

export class HttpOpenTransaction {
	private openTransaction: OpenTransaction;

	constructor(httpOpenTransaction: any) {
		if (httpOpenTransaction.has_open) {
			this.openTransaction = new OpenTransaction(
				httpOpenTransaction.has_open,
				httpOpenTransaction.transaction_id,
				httpOpenTransaction.pos_transaction_id
			)
		} else {
			this.openTransaction = new OpenTransaction(
				httpOpenTransaction.has_open,
				null,
				null
			)
		}
	}

	getOpenTransaction(): OpenTransaction {
		return this.openTransaction;
	}
}