import { AlertController, Alert } from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the AlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertProvider {

  constructor(private alertCtrl: AlertController) {}

  showBasic(title: string, message: string): Alert {
  	return this.alertCtrl.create({
  		title: title,
  		subTitle: message,
  		buttons: ['OK']
  	});
  }

  showConfirmation(title: string, message: string, buttons: Array<any>) {
    let confirm = this.alertCtrl.create({enableBackdropDismiss: false});
    confirm.setTitle(title);
    confirm.setMessage(message);
    buttons.forEach(button => {
      confirm.addButton({
        text: button.text,
        role: button.role,
        handler: () => {
          confirm.dismiss(button.selection);
          return false;
        }
      });
    });
   return confirm;
  }

}
