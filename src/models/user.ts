import { AuthToken } from './auth-token';

export class User {
	id: number;
	slug: string;
	businessName: string;
	logo: string;
	connectedPos: string;
	authToken: AuthToken;
	
	constructor(
		id: number,
		slug: string,
		businessName: string,
		logo: string,
		connectedPos: string,
		authToken: AuthToken
	) {
		this.id = id;
		this.slug = slug;
		this.businessName = businessName;
		this.logo = logo;
		this.connectedPos = connectedPos;
		this.authToken = authToken;
	}
}