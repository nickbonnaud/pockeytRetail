import { ToastController, Toast } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(private toastCtrl: ToastController) {}

  show(message: string, type: string, position: string = 'bottom', showClose: boolean = false, autoDismiss: boolean = true, showButtonText?: string, ) {
  	let toast: any;
    if (autoDismiss) {
      toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: position,
        cssClass: `${type}-toast`,
        showCloseButton: showClose,
        closeButtonText: showButtonText ? showButtonText : 'Ok'
      });
    } else {
      toast = this.toastCtrl.create({
        message: message,
        position: position,
        cssClass: `${type}-toast`,
        showCloseButton: showClose,
        closeButtonText: showButtonText ? showButtonText : 'Ok'
      });
    }

  	toast.present();
  }

  showPusherToast(message: string, notifStyle: string): Toast {
    console.log(`${notifStyle}-toast`);
    return this.toastCtrl.create({
      message: message,
      position: 'top',
      closeButtonText: 'OK',
      showCloseButton: true,
      cssClass: `${notifStyle}-toast`
    });
  }

}
