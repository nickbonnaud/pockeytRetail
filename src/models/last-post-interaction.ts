export class LastPostInteraction {
	hasInteraction: boolean;
	viewedOn: Date;
	isRedeemable: boolean;
	isEvent: boolean;
	message: string;
	body: string;
	title: string;
	photo: string;

	constructor(
		hasInteraction: boolean,
		viewedOn: Date,
		isRedeemable: boolean,
		isEvent: boolean,
		message: string,
		body: string,
		title: string,
		photo: string
	) {
		this.hasInteraction = hasInteraction;
		this.viewedOn = viewedOn;
		this.isRedeemable = isRedeemable;
		this.isEvent = isEvent;
		this.message = message;
		this.body = body;
		this.title = title;
		this.photo = photo;
	}
}