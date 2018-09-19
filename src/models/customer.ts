import { LastTransaction } from './last-transaction';
import { OpenTransaction } from './open-transaction';
import { LastPostInteraction } from './last-post-interaction';
import { Deal } from './deal';
import { LoyaltyCard } from './loyalty-card';

export class Customer {
	id: number;
	firstName: string;
	lastName: string;
	smallPhoto: string;
	largePhoto: string;
	lastTransaction: LastTransaction;
	openTransaction: OpenTransaction;
	lastPostInteraction: LastPostInteraction;
	deal: Deal;
	loyaltyCard: LoyaltyCard

	constructor(
		id: number,
		firstName: string,
		lastName: string,
		smallPhoto: string,
		largePhoto: string,
		lastTransaction: LastTransaction,
		openTransaction: OpenTransaction,
		lastPostInteraction: LastPostInteraction,
		deal: Deal,
		loyaltyCard: LoyaltyCard
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.smallPhoto = smallPhoto;
		this.largePhoto = largePhoto;
		this.lastTransaction = lastTransaction;
		this.openTransaction = openTransaction;
		this.lastPostInteraction = lastPostInteraction;
		this.deal = deal;
		this.loyaltyCard = loyaltyCard;
	}
}