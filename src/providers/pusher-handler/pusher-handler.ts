import { Injectable } from '@angular/core';
import { Toast } from 'ionic-angular';

import { HttpCustomer } from '../../http-formatters/http-customer';
import { Customer } from '../../models/customer';
import { UpdatedCustomer } from '../../models/updated-customer';

import { PusherProvider } from '../pusher/pusher';
import { ToastProvider } from '../toast/toast';
import { PopToRootProvider } from '../pop-to-root/pop-to-root';
import { CustomersManagerProvider } from '../customers-manager/customers-manager';

/*
  Generated class for the PusherHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PusherHandlerProvider {
	private NOTIF_TYPE_DEFAULT: string = 'notif-default';
	private NOTIF_TYPE_DEAL_REWARD_DENY: string = 'notif-deal-reward-deny';
	private NOTIF_TYPE_DEAL_REWARD_ACCEPT: string = 'notif-deal-reward-accept';
	private NOTIF_TYPE_PAY_ERROR: string = 'notif-pay-error';
	private NOTIF_TYPE_EXIT: string = 'notif-exit';
	private NOTIF_TYPE_ENTER: string = 'notif-enter';
	private NOTIF_TYPE_EXIT_PAID: string = 'notif-exit-paid';

  constructor(
  	private pusher: PusherProvider,
  	private toast: ToastProvider,
  	private shouldPopToRoot: PopToRootProvider,
  	private customersManager: CustomersManagerProvider
  ) {}

  init() {
  	this.pusher.init().then(channel => {
  		channel.bind(this.pusher.PUSHER_EVENT, (event) => {
  			let customer: Customer = (new HttpCustomer(event.data.data)).getCustomer();
  			this.handlerPusherEvent(event.data.type, customer);
  		})
  	})
  }

  handlerPusherEvent(type: string, customer: Customer) {
  	let message: string;
  	let notifType: string = this.NOTIF_TYPE_DEFAULT;
  	switch (type) {
  		case "deal_redeemed":
  			message = `${customer.firstName} has accepted your request to redeem their deal!`;
  			notifType = this.NOTIF_TYPE_DEAL_REWARD_ACCEPT;
  			break;
  		case "loyalty_redeemed":
  			message = `${customer.firstName} has accepted your request to redeem their loyalty reward!`;
  			notifType = this.NOTIF_TYPE_DEAL_REWARD_ACCEPT;
  			break;
  		case "redeem_later_deal":
  			message = `${customer.firstName} wishes to redeem their deal at a later time.`;
  			notifType = this.NOTIF_TYPE_DEAL_REWARD_DENY;
  			break;
  		case "wrong_deal":
  			message = `${customer.firstName} claims they did not purchase this deal.`;
  			notifType = this.NOTIF_TYPE_DEAL_REWARD_DENY;
  			break;
  		case "redeem_later_reward":
  			message = `${customer.firstName} wishes to redeem their loyalty reward at a later time.`;
  			notifType = this.NOTIF_TYPE_DEAL_REWARD_DENY;
  			break;
  		case "not_earned_reward":
  			message = `${customer.firstName} claims they have not earned this loyalty reward.`;
  			notifType = this.NOTIF_TYPE_DEAL_REWARD_DENY;
  			break;
  		case "wrong_bill":
  			message = `${customer.firstName} claims the bill they were sent was the wrong bill.`;
  			notifType = this.NOTIF_TYPE_PAY_ERROR;
  			break;
  		case "error_bill":
  			message = `${customer.firstName} claims their is an error with their bill.`;
  			notifType = this.NOTIF_TYPE_PAY_ERROR;
  			break;
  		case "customer_enter":
  			message = `${customer.firstName} ${customer.lastName} has entered your location.`;
  			notifType = this.NOTIF_TYPE_ENTER;
  			break;
  		case "customer_exit_unpaid":
  			message = `${customer.firstName} ${customer.lastName} has left with an open bill.`;
  			notifType = this.NOTIF_TYPE_EXIT;
  			break;
  		case "customer_exit_paid":
  			message = null;
  			notifType = this.NOTIF_TYPE_EXIT_PAID;
  			break;
  	}
  	this.showNotification(customer, message, notifType);
  }

  showNotification(customer: Customer, message: string, notifType: string) {
  	if (notifType! != this.NOTIF_TYPE_EXIT_PAID) {
  		if (notifType == this.NOTIF_TYPE_ENTER) {
  			this.customersManager.updateList(new UpdatedCustomer(customer, true, false));
  		}
  		let toastMessage: Toast = this.toast.showPusherToast(message, notifType);
  		toastMessage.present();
  		toastMessage.onDidDismiss(() => {
  			if (notifType != this.NOTIF_TYPE_ENTER) {
  				this.customersManager.updateList(new UpdatedCustomer(customer, true, false));
  				this.shouldPopToRoot.shouldPopToRoot(true);
  			}
  		});
  	} else {
  		this.customersManager.updateList(new UpdatedCustomer(customer, false, true));
  	}
  }
}
