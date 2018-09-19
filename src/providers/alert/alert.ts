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

}
