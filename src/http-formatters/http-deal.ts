import { Deal } from '../models/deal';

export class HttpDeal {
	private deal: Deal;

	constructor(httpDeal: any) {
		if (httpDeal.has_deal) {
			this.deal = new Deal(
				httpDeal.has_deal,
				httpDeal.deal_id,
				httpDeal.deal_item
			)
		} else {
			this.deal = new Deal(
				httpDeal.has_deal,
				null,
				null
			)
		}
	}

	getDeal(): Deal {
		return this.deal;
	}
}