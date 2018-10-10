import { Injectable } from '@angular/core';
import { IBeacon, IBeaconDelegate, BeaconRegion, IBeaconPluginResult } from '@ionic-native/ibeacon';
import { Platform, Alert } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
  private BEACON_ALERT_CANCEL_SELECTION: string = "cancel";
  private BEACON_ALERT_STOP_SELECTION: string = "stop";
	private beacon: Beacon
  private isRunning: boolean;

  public beaconRunningSource = new BehaviorSubject<boolean>(false);
  beaconRunningSource$ = this.beaconRunningSource.asObservable();

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
    if (!this.isRunning) {
      this.setIsRunning(true);
      if (this.platform.is(this.IOS_DEVICE)) {
        this.startIosBeacon();
      } else {
        this.startAndroidBeacon();
      }
    }
  }

  stopBeacon() {
    let alert: Alert = this.showStopBeaconWarning();
    alert.onDidDismiss((selection: string) => {
      if (selection == this.BEACON_ALERT_STOP_SELECTION) {
        if (this.isRunning) {
          this.setIsRunning(false);
          if (this.platform.is(this.IOS_DEVICE)) {
            this.stopIosBeacon();
          } else {
            this.stopAndroidBeacon();
          }
        }
      }
    })
    alert.present();
  }

  showStopBeaconWarning() {
    const title: string = "Warning! You are turning off the Pockeyt Beacon!";
    const message: string = "This Beacon is required for Pockeyt Pay to work.";
    const buttons: Array<any> = [
      { text: "Cancel", role: null, selection: this.BEACON_ALERT_CANCEL_SELECTION },
      { text: "Stop Beacon", role: "cancel", selection: this.BEACON_ALERT_STOP_SELECTION }
    ]
    return this.alert.showConfirmation(title, message, buttons);
  }

  startIosBeacon() {
  	let beaconRegion: BeaconRegion = this.iBeacon.BeaconRegion(this.beacon.identifier, this.beacon.uuid);
  	this.iBeacon.startAdvertising(beaconRegion);
  }

  stopIosBeacon() {
    this.iBeacon.isAdvertising().then((isAdvertising: boolean) => {
      if (isAdvertising) {
        let beaconRegion: BeaconRegion = this.iBeacon.BeaconRegion(this.beacon.identifier, this.beacon.uuid);
        this.iBeacon.stopAdvertising(beaconRegion);
      }
    });
  }

  startAndroidBeacon() {
    window['plugins'].beaconPlugin.start(this.beacon.uuid, function() {
      console.log("Success beacon Started");
    }, function(err) {
      console.log("Error " + err);
    });
  }

  stopAndroidBeacon() {
    window['plugins'].beaconPlugin.stop(function() {
      console.log("Stop success");
    }, function(err) {
      console.log("error " + err);
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

  setIsRunning(isRunning: boolean) {
    this.isRunning = isRunning;
    this.beaconRunningSource.next(isRunning);
  }

}
