import { User } from '../models/user';

export class HttpUser {
	
	private user: User;

	constructor(httpUser: any) {
		this.user = new User(
			httpUser.id,
			httpUser.slug,
			httpUser.business_name,
			httpUser.logo,
			httpUser.connected_pos,
			httpUser.token
		);
	}

	getUser(): User {
		return this.user;
	}
}