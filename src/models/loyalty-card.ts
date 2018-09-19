export class LoyaltyCard {
	hasReward: boolean;
	id: number;
	unredeemedRewards: number;
	totalRewards: number;
	reward: string;

	constructor(
		hasReward: boolean,
		id: number,
		unredeemedRewards: number,
		totalRewards: number,
		reward: string
	) {
		this.hasReward = hasReward;
		this.id = id;
		this.unredeemedRewards = unredeemedRewards;
		this.totalRewards = totalRewards;
		this.reward = reward;
	}
}