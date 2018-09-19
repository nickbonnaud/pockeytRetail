import { Component, Input, ElementRef, ViewChild, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { Platform } from 'ionic-angular';

import { Customer } from '../../models/customer';
import { AuthToken } from '../../models/auth-token';

import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastProvider } from '../../providers/toast/toast';

/**
 * Generated class for the CustomerChargeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'customer-charge',
  templateUrl: 'customer-charge.html'
})
export class CustomerChargeComponent {
  private API_SUCCESS_RESPONSE: string = 'waiting_customer_approval';

	@Input() customer: Customer;
  @ViewChild('noCustomerContainer') noCustomerContainer: ElementRef;

	private isLoadingLoyalty: boolean;
	private isLoadingDeal: boolean;
  private noCustomerIconWidth: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private api: ApiProvider,
    private auth: AuthProvider,
    private toast: ToastProvider,
    private platform: Platform
  ) {
  	this.isLoadingLoyalty = false;
  	this.isLoadingDeal = false;
  }

  ngAfterViewInit() {
    if (!this.customer) {
      let maxWidth = this.platform.width() > this.platform.height() ? this.platform.width() / 4 : this.platform.height() / 4;
      this.noCustomerIconWidth = 100 * Math.round(3 / (maxWidth / 100)) + 'px';
      this.changeDetectorRef.detectChanges();
    }
  }

  redeemLoyalty() {
  	this.isLoadingLoyalty = !this.isLoadingLoyalty;
    this.doRedeemLoyalty();
  }

  redeemDeal() {
  	this.isLoadingDeal = !this.isLoadingDeal;
    this.doRedeemDeal();
  }

  doRedeemLoyalty() {
    this.auth.tokenReady().then((token: AuthToken) => {
      let endpoint: string = 'loyalty';
      let data = {
        id: this.customer.loyaltyCard.id,
        _method: 'PATCH'
      };
      let header = `Bearer ${token.value}`;
      let loyaltyPoster = this.api.post(endpoint, data, null, null, header).subscribe(res => {
        if (res.success != this.API_SUCCESS_RESPONSE) {
          this.handleApiErrorResponse();
          this.isLoadingLoyalty = false;
        }
        loyaltyPoster.unsubscribe();
      });
    });
  }

  doRedeemDeal() {
    this.auth.tokenReady().then((token: AuthToken) => {  
      let endpoint: string = 'deal';
      let data = {
        id: this.customer.deal.dealId,
        _method: 'PATCH'
      };
      let header = `Bearer ${token.value}`;
      let dealPoster = this.api.post(endpoint, data, null, null, header).subscribe(res => {
        if (res.success != this.API_SUCCESS_RESPONSE) {
          this.handleApiErrorResponse();
          this.isLoadingDeal = false;
        }
        dealPoster.unsubscribe();
      });
    });
  }

  handleApiErrorResponse() {
    let message: string = 'Oops! Something went wrong. Please try again!';
    this.toast.show(message, 'toast-error error-notify', 'middle');
  }

}
