import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { PopToRootProvider } from '../../providers/pop-to-root/pop-to-root';

import 'rxjs/add/operator/takeWhile';

/**
 * Generated class for the CustomerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html',
})
export class CustomerDetailsPage {
  private alive: boolean;
  private popToRootWatcher: Subscription;

  constructor(
    private popToRootManager: PopToRootProvider,
    private navCtrl: NavController
  ) {
    this.alive = true;
  }

  ngOnInit() {
    this.setPopToRootWatcher();
  }

  setPopToRootWatcher() {
    this.popToRootWatcher = this.popToRootManager.popToRootSource$.takeWhile(() => this.alive).subscribe((shouldPopToRoot: boolean) => {
      if (shouldPopToRoot) {
        this.navCtrl.popToRoot();
      }
    });
  }

  ionViewWillUnload() {
    this.alive = false;
    this.popToRootWatcher.unsubscribe();
  }

}
