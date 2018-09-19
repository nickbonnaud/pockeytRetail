export class AuthToken {
	value: string;
	expiry: number;
	
	constructor(value: string,  expiry: number) {
		this.value = value;
		this.expiry = expiry;
	}
}