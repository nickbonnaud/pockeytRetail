import { Injectable } from '@angular/core';

import { AuthProvider } from '../auth/auth';

import { Environment } from '../../environment/environment';
import { User } from '../../models/user';

import Pusher from 'pusher-js';

/*
  Generated class for the PusherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PusherProvider {
	public PUSHER_EVENT: string = "App\\Events\\UpdateConnectedApps";
	private AUTH_ENDPOINT: string = `${Environment.DEVELOPMENT.API_URL}/pusher`;
	private CHANNEL_ID: string = 'private-update';
	private channel;

  constructor(private auth: AuthProvider) {}

  authorizePusherSetup(user: User) {
		return new Pusher(Environment.PRODUCTION.PUSHER_KEY, {
			cluster: Environment.PRODUCTION.CLUSTER,
			authEndpoint: `${this.AUTH_ENDPOINT}/${user.slug}`,
			auth: {
				headers: {
					'Accept': 'application/json',
					'Authorization': `Bearer ${user.authToken.value}`
				}
			},
			encrypted: true
		});
  }

  init() {
  	return this.auth.getUser().then((user: User) => {
  		return this.authorizePusherSetup(user).subscribe(`${this.CHANNEL_ID}.${user.slug}`);
  	})
  }

}
