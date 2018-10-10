import { Injectable } from '@angular/core';

import { LayoutManagerProvider } from '../layout-manager/layout-manager';
import { AuthProvider } from '../auth/auth';
import { PusherHandlerProvider } from '../pusher-handler/pusher-handler';
import { BeaconManagerProvider } from '../beacon-manager/beacon-manager';
import { CustomersManagerProvider } from '../customers-manager/customers-manager';

/*
  Generated class for the OnStartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OnStartProvider {

  constructor(
    private layoutManager: LayoutManagerProvider,
    private auth: AuthProvider,
    private pusherHandler: PusherHandlerProvider,
    private beaconManager: BeaconManagerProvider,
    private customersManager: CustomersManagerProvider
  ) {}

  init() {
  	return new Promise(resolve => {
  		this.layoutManager.init();
      this.pusherHandler.init();
      this.customersManager.init();
      this.beaconManager.requestAuthorization();
      this.beaconManager.init();
	  	this.auth.init().then((isLoggedIn: boolean) => {
	  		resolve(isLoggedIn);
	  	});
  	});
  }
}
