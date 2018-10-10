import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { PopToRootProvider } from '../../providers/pop-to-root/pop-to-root';
import { BeaconManagerProvider } from '../../providers/beacon-manager/beacon-manager';

import 'rxjs/add/operator/takeWhile';


@IonicPage()
@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html',
})
export class CustomerDetailsPage {
  private alive: boolean;
  private popToRootWatcher: Subscription;
  private beaconRunning: boolean;
  private beaconRunningWatcher: Subscription;

  constructor(
    private popToRootManager: PopToRootProvider,
    private navCtrl: NavController,
    private beaconManager: BeaconManagerProvider
  ) {
    this.alive = true;
  }

  ngOnInit() {
    this.setPopToRootWatcher();
    this.setIsBeaconRunning();
  }

  setPopToRootWatcher() {
    this.popToRootWatcher = this.popToRootManager.popToRootSource$.takeWhile(() => this.alive).subscribe((shouldPopToRoot: boolean) => {
      if (shouldPopToRoot) {
        this.navCtrl.popToRoot();
      }
    });
  }

  setIsBeaconRunning() {
    this.beaconRunningWatcher = this.beaconManager.beaconRunningSource$.takeWhile(() => this.alive).subscribe((beaconRunning: boolean) => {
      this.beaconRunning = beaconRunning;
    });
  }

  toggleBeacon() {
    if (this.beaconRunning) {
      this.beaconManager.stopBeacon();
    } else {
      this.beaconManager.startBeacon();
    }
  }

  ngOnDestroy() {
    this.alive = false;
    this.popToRootWatcher.unsubscribe();
    this.beaconRunningWatcher.unsubscribe();
  }

}
