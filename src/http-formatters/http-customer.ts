import { Customer } from '../models/customer';
import { HttpLastTransaction } from './http-last-transaction';
import { HttpOpenTransaction } from './http-open-transaction';
import { HttpLastPostInteraction } from './http-last-post-interaction';
import { HttpDeal } from './http-deal';
import { HttpLoyaltyCard } from './http-loyalty-card';

export class HttpCustomer {
	private customer: Customer;

	constructor(httpCustomer: any) {
		this.customer = new Customer(
			httpCustomer.id,
			httpCustomer.first_name,
			httpCustomer.last_name,
			httpCustomer.photo_path,
			httpCustomer.large_photo_path,
			(new HttpLastTransaction(httpCustomer.recent_transaction)).getLastTransaction(),
			(new HttpOpenTransaction(httpCustomer.open_transaction)).getOpenTransaction(),
			(new HttpLastPostInteraction(httpCustomer.last_post_interactions)).getLastPostInteraction(),
			(new HttpDeal(httpCustomer.deal_data)).getDeal(),
			(new HttpLoyaltyCard(httpCustomer.loyalty_card)).getLoyaltyCard()
		)
	}

	getCustomer(): Customer {
		return this.customer;
	}
}