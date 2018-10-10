import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LayoutManagerProvider } from '../../providers/layout-manager/layout-manager';
import { BeaconManagerProvider } from '../../providers/beacon-manager/beacon-manager';

import 'rxjs/add/operator/takeWhile';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private isSplitPane: boolean;
  private splitPaneWatcher: Subscription;
  private beaconRunning: boolean;
  private beaconRunningWatcher: Subscription;
  private alive: boolean

  constructor (
    private layoutManager: LayoutManagerProvider,
    private changeRef: ChangeDetectorRef,
    private beaconManager: BeaconManagerProvider
  ) {
    this.alive = true;
  }

  ngOnInit() {
    this.setShouldShowSplitPane();
    this.setIsBeaconRunning();
  }

  setShouldShowSplitPane() {
    this.splitPaneWatcher = this.layoutManager.isDualPaneLayoutSource$.takeWhile(() => this.alive).subscribe((isSplitPane: boolean) => {
      this.isSplitPane = isSplitPane;
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
    this.splitPaneWatcher.unsubscribe();
    this.beaconRunningWatcher.unsubscribe();
  }

}
