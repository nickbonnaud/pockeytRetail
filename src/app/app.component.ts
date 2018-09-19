import { Component } from '@angular/core';
import { Platform, ModalController, Modal } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subscription } from 'rxjs/Subscription';

import { OnStartProvider } from '../providers/on-start/on-start';
import { CustomersManagerProvider } from '../providers/customers-manager/customers-manager';
import { LayoutManagerProvider } from '../providers/layout-manager/layout-manager';

import { Customer } from '../models/customer';

import { HomePage } from '../pages/home/home';
import { LoginModalPage } from '../pages/login-modal/login-modal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = HomePage;

  private splitPaneWatcher: Subscription;
  private isSplitPane: boolean;
  private alive: boolean;
  
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    onStart: OnStartProvider,
    private customersManager: CustomersManagerProvider,
    private layoutManager: LayoutManagerProvider,
    private modalCtrl: ModalController
  ) {
    platform.ready().then(() => {
      this.alive = true;
      this.layoutManager.init();
      this.setShouldShowSplitPane();
      statusBar.styleDefault();
      onStart.init().then((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.showLoginModal();
        }
        splashScreen.hide();
      });
    });
  }

  showLoginModal() {
    let loginModal: Modal = this.modalCtrl.create(LoginModalPage, null, {enableBackdropDismiss: false});
    loginModal.present();
  }

  setShouldShowSplitPane() {
    this.splitPaneWatcher = this.layoutManager.isDualPaneLayoutSource$.takeWhile(() => this.alive).subscribe((isSplitPane: boolean) => {
      this.isSplitPane = isSplitPane;
    })
  }
}

