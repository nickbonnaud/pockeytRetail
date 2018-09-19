import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthToken } from '../../models/auth-token';
import { User } from '../../models/user';
import { HttpUser } from '../../http-formatters/http-user'

import { TokenManagerProvider } from '../token-manager/token-manager';
import { ApiProvider } from '../api/api';

import 'rxjs/add/operator/takeWhile';

@Injectable()
export class AuthProvider {

	public authUser: User;
	public authUserSource = new BehaviorSubject<User>(null);
	authUserSource$ = this.authUserSource.asObservable();

  constructor(private tokenManager: TokenManagerProvider, private api: ApiProvider) {}

  init() {
  	return new Promise(resolve => {
			this.tokenManager.getToken().then((token: AuthToken) => {
				if (token == null || token.value == null || this.tokenManager.tokenIsExpired(token)) {
					resolve(false);
				} else {
					this.fetchAuthorizedUser(token).subscribe((response: any) => {
						if (response.error) {
							this.tokenManager.expireToken().then(() => {
								this.init();
							});
							resolve(false);
						} else {
							this.setAuthUser((new HttpUser(response.data)).getUser());
							resolve(true);
						}
					})
				}
			});
  	});
  }

  tokenReady() {
  	return new Promise<AuthToken>(resolve => {
			let authUserWatcher = this.authUserSource$.subscribe((authUser: User) => {
        if (authUser != null) {
          resolve(authUser.authToken);
          authUserWatcher.unsubscribe();
        }
			});
  	})
  }

  getUser(): Promise<User> {
    return new Promise<User>(resolve => {
      let authUserWatcher = this.authUserSource$.subscribe((authUser: User) => {
        if (authUser != null) {
          resolve(authUser);
          authUserWatcher.unsubscribe();
        }
      });
    });
  }

  setAuthUser(user: User) {
  	this.authUser = user;
  	this.tokenManager.updateToken(user.authToken);
  	this.authUserSource.next(user);
  }

  fetchAuthorizedUser(token: AuthToken) {
  	let params = {'token': token.value};
  	return this.api.get('me', params);
  }

}
