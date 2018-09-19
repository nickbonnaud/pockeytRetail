import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Customer } from '../../models/customer';
import { CustomersManagerProvider } from '../../providers/customers-manager/customers-manager';
import { SelectedCustomerProvider } from '../../providers/selected-customer/selected-customer';

import 'rxjs/add/operator/takeWhile';

/**
 * Generated class for the GridLayoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'grid-layout',
  templateUrl: 'grid-layout.html'
})
export class GridLayoutComponent {

  private highLightCustomer: Subscription;
  private customersWatcher: Subscription;
  private alive: boolean;
  private customers: Customer[];
  private highLightedCustomerId: number;

  constructor(private customersManager: CustomersManagerProvider, private selectedCustomer: SelectedCustomerProvider) {
  	this.alive = true;
  }

  ngOnInit() {
    this.setCustomersWatcher();
  	this.setCustomerHighLightWatcher();
  }

  selectCustomer(customer: Customer) {
  	this.selectedCustomer.setSelectedCustomer(customer);
  }

  setCustomersWatcher() {
    this.customersWatcher = this.customersManager.customersSource$.takeWhile(() => this.alive).subscribe((customers: Customer[]) => {
      if (customers) {
        this.customers = customers;
      }
    });
  }

  setCustomerHighLightWatcher() {
    this.highLightCustomer = this.customersManager.highLightedCustomerSource$.takeWhile(() => this.alive).subscribe((customer: Customer) => {
      if (customer) {
      	this.highLightedCustomerId = customer.id;
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
    this.highLightCustomer.unsubscribe();
    this.customersWatcher.unsubscribe();
  }
}
