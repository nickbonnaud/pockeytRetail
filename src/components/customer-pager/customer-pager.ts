import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Customer } from '../../models/customer';
import { User } from '../../models/user';

import { SelectedCustomerProvider } from '../../providers/selected-customer/selected-customer';
import { AuthProvider } from '../../providers/auth/auth';
import 'rxjs/add/operator/takeWhile';


/**
 * Generated class for the CustomerPagerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'customer-pager',
  templateUrl: 'customer-pager.html'
})
export class CustomerPagerComponent {
	private KEY_CHARGE: string = 'charge';
	private KEY_ABOUT: string = 'about';
	private selection: string = this.KEY_CHARGE;

  private customer: Customer;
  private user: User;
  private alive: boolean;
  private customerWatcher: Subscription;

  constructor(private selectedCustomer: SelectedCustomerProvider, private auth: AuthProvider) {
    this.alive = true;
  }

  ngOnInit() {
   this.customerWatcher = this.selectedCustomer.selectedCustomerSource$.takeWhile(() => this.alive).subscribe((customer: Customer) => {
     this.customer = customer;
   });

   this.auth.getUser().then((user: User) => {
      this.user = user;
    });
  }
}
