import { Injectable } from '@angular/core';

import { AuthToken } from '../../models/auth-token';

import { UserStorageProvider } from '../user-storage/user-storage';

/*
  Generated class for the TokenManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TokenManagerProvider {

  constructor(private userStorage: UserStorageProvider) {}

  getToken(): Promise<AuthToken> {
  	return this.userStorage.getValue(UserStorageProvider.AUTH_TOKEN_KEY);
  }

  updateToken(token: AuthToken) {
  	this.userStorage.setValue(UserStorageProvider.AUTH_TOKEN_KEY, token);
  }

	expireToken(): Promise<AuthToken> {
		return this.getToken().then((token: AuthToken) => {
			token.expiry = null;
			token.value = null;
			this.updateToken(token);
			return token;
		})
	}




	tokenIsExpired(token: AuthToken): boolean {
		return token.expiry < Math.round(+new Date() / 1000);
	}

}
