import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserStorageProvider {

	private USER_KEY: string = '_user';
	public static AUTH_TOKEN_KEY: string = 'auth_token';

	constructor(private storage: Storage) {}

	setValue(key: string, value: any): Promise<any> {
		return this.storage.set(key, value);
	}

	getValue(key: string): Promise<any> {
		return this.storage.get(key)
			.then(value => {
				if (!value) {
					return null;
				}
				return value;
			})
	}
}
