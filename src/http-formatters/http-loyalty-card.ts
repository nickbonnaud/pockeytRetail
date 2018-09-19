import { LoyaltyCard } from '../models/loyalty-card';

export class HttpLoyaltyCard {
	private loyaltyCard: LoyaltyCard;

	constructor(httpLoyaltyCard) {
		if (httpLoyaltyCard.has_reward) {
			this.loyaltyCard = new LoyaltyCard(
				httpLoyaltyCard.has_reward,
				httpLoyaltyCard.loyalty_card_id,
				httpLoyaltyCard.unredeemed_count,
				httpLoyaltyCard.total_rewards_earned,
				httpLoyaltyCard.loyalty_reward
			)
		} else {
			this.loyaltyCard = new LoyaltyCard(
				httpLoyaltyCard.has_reward,
				null,
				null,
				null,
				null
			)
		}
	}

	getLoyaltyCard(): LoyaltyCard {
		return this.loyaltyCard;
	}
}