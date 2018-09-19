import { LastPostInteraction } from '../models/last-post-interaction';

export class HttpLastPostInteraction {
	private lastPostInteraction: LastPostInteraction;

	constructor(httpLastPostInteraction: any) {
		if (httpLastPostInteraction.has_recent) {
			this.lastPostInteraction = new LastPostInteraction(
				httpLastPostInteraction.has_recent,
				httpLastPostInteraction.viewed_on,
				httpLastPostInteraction.is_redeemable,
				httpLastPostInteraction.is_event,
				httpLastPostInteraction.message,
				httpLastPostInteraction.body,
				httpLastPostInteraction.title,
				httpLastPostInteraction.postImageUrl
			)
		} else {
			this.lastPostInteraction = new LastPostInteraction(
				httpLastPostInteraction.has_recent,
				null,
				null,
				null,
				null,
				null,
				null,
				null
			)
		}
	}

	getLastPostInteraction(): LastPostInteraction {
		return this.lastPostInteraction;
	}
}