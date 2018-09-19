import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { Customer } from '../../models/customer';
import { CustomersManagerProvider } from '../../providers/customers-manager/customers-manager';
import { SelectedCustomerProvider } from '../../providers/selected-customer/selected-customer';

import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'list-layout',
  templateUrl: 'list-layout.html'
})
export class ListLayoutComponent {

  private highLightCustomer: Subscription;
  private customersWatcher: Subscription;
  private alive: boolean;
  private customers: Customer[];
  private highLightedCustomerId: number;

  constructor(private navCtrl: NavController, private customersManager: CustomersManagerProvider, private selectedCustomer: SelectedCustomerProvider) {
  	this.alive = true;
  }

  ngOnInit() {
    this.setCustomersWatcher();
  	this.setCustomerHighLightWatcher();
  }

  goToDetailsPage(customer: Customer) {
    this.selectedCustomer.setSelectedCustomer(customer);
  	this.navCtrl.push('CustomerDetailsPage');
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
