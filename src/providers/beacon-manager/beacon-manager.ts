import { Injectable } from '@angular/core';
import { IBeacon, IBeaconDelegate, BeaconRegion, IBeaconPluginResult } from '@ionic-native/ibeacon';
import { Platform, Alert } from 'ionic-angular';

import { AuthToken } from '../../models/auth-token';
import { Beacon } from '../../models/beacon';

import { ApiProvider } from '../api/api';
import { AuthProvider } from '../auth/auth';
import { AlertProvider } from '../alert/alert';

/*
  Generated class for the BeaconManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeaconManagerProvider {
	private IOS_DEVICE: string = "ios";
	private beacon: Beacon

  constructor(
  	private api: ApiProvider,
  	private auth: AuthProvider,
  	private iBeacon: IBeacon,
  	private platform: Platform,
  	private alert: AlertProvider
  ) {}

  init() {
  	this.auth.tokenReady().then((token: AuthToken) => {
  		this.isReadyToAdvertise();
  		this.fetchBeaconData(token);	
  	});
  }

  fetchBeaconData(token: AuthToken) {
  	let endpoint: string = 'beacons';
  	let header: string = `Bearer ${token.value}`;

  	let beaconApi = this.api.get(endpoint, undefined, undefined, undefined, header).subscribe((response: any) => {
  		this.beacon = new Beacon(response.data.uuid, response.data.identifier);
  		this.startBeacon();
  	})
  }

  startBeacon() {
  	if (this.platform.is(this.IOS_DEVICE)) {
  		this.startIosBeacon();
  	}
  }

  startIosBeacon() {
  	let beaconRegion: BeaconRegion = this.iBeacon.BeaconRegion(this.beacon.identifier, this.beacon.uuid);
  	this.iBeacon.startAdvertising(beaconRegion).then(() => {
  		this.iBeacon.isAdvertising().then((result: boolean) => {
  			console.log('Is advertising: ' + result);
  		})
  	});
  }

 	isReadyToAdvertise() {
 		this.iBeacon.isBluetoothEnabled().then((bleIsEnabled: boolean) => {
			this.iBeacon.getAuthorizationStatus().then((status: IBeaconPluginResult) => {
				let message: string;
				let title: string;
				if (status.authorizationStatus == 'AuthorizationStatusDenied' && !bleIsEnabled) {
					title = 'Warning Location and Bluetooth Disabled!';
					message = 'Please enable Location Services and Bluetooth. Both are required for Pockeyt Pay.';
				} else if (status.authorizationStatus == 'AuthorizationStatusDenied' && bleIsEnabled) {
					title = 'Warning Location Services Disabled!';
					message = 'Please enable Location Services. Location services are required for Pockeyt Pay.';
				} else if (status.authorizationStatus != 'AuthorizationStatusDenied' && !bleIsEnabled) {
					title = 'Warning Bluetooth Disabled!';
					message = "Please enable bluetooth on this device. Bluetooth is required for Pockeyt Pay.";
				}
				
				if (title && message) {
					this.showDisabledAlert(title, message);
				}
			});
 		});
 	}

 	showDisabledAlert(title: string, message: string) {
 		const alert: Alert = this.alert.showBasic(title, message);
 		alert.present();
 	}

 	requestAuthorization() {
 		this.iBeacon.requestAlwaysAuthorization();
 	}

}
