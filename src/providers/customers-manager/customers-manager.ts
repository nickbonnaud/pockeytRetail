import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthToken } from '../../models/auth-token';
import { Customer } from '../../models/customer';
import { HttpCustomer } from '../../http-formatters/http-customer';
import { UpdatedCustomer } from '../../models/updated-customer';

import { ApiProvider } from '../api/api';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the CustomersManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomersManagerProvider {

  public customers: Customer[];
  public customersSource = new BehaviorSubject<Customer[]>([]);
  customersSource$ = this.customersSource.asObservable();

  public highLightedCustomerSource = new BehaviorSubject<Customer>(null);
  highLightedCustomerSource$ = this.highLightedCustomerSource.asObservable();
  
  constructor(private api: ApiProvider, private auth: AuthProvider) {}

  init() {
    this.auth.tokenReady().then((token: AuthToken) => {
      if (token) {
        this.fetchCustomers(token);
      }
    });
  }

  getCustomers() {
    return new Promise<Customer[]>(resolve => {
      let customersWatcher = this.customersSource$.subscribe((customers: Customer[]) => {
        if (customers != null) {
          resolve(customers);
          customersWatcher.unsubscribe();
        }
      })
    });
  }

  private fetchCustomers(token: AuthToken) {
  	let endpoint: string = 'customers';
  	let header: string = `Bearer ${token.value}`;

  	let customerGet = this.api.get(endpoint, undefined, undefined, undefined, header).subscribe((response: any) => {
      let customers: Customer[] = [];
      for (let httpCustomer of response.data) {
        for (var i = 15 - 1; i >= 0; i--) {
          var cloneCustomer = httpCustomer;
          customers.push((new HttpCustomer(cloneCustomer)).getCustomer());
        }
      }
      this.customers = customers;
      this.setCustomers(customers);
      customerGet.unsubscribe();
    });
  }

  setCustomers(customers: Customer[]) {
    this.customers = customers;
    this.customersSource.next(customers);
  }

  updateList(updatedCustomer: UpdatedCustomer) {
    let index = this.customers.findIndex((customer: Customer) => customer.id == updatedCustomer.customer.id);
    if (updatedCustomer.shouldRemove) {
      this.removeCustomerFromList(index);
    } else {
      if (index == -1) {
        this.addCustomerToList(updatedCustomer);
      } else {
        this.removeCustomerFromList(index);
        this.addCustomerToList(updatedCustomer);
      }
      if (updatedCustomer.shouldHighlight) {
        this.hightLightCustomer(updatedCustomer.customer);
      }
      this.customersSource.next(this.customers);
    }
  }

  hightLightCustomer(customer: Customer) {
    this.highLightedCustomerSource.next(customer);
  }

  addCustomerToList(updatedCustomer: UpdatedCustomer) {
    this.customers.unshift(updatedCustomer.customer);
  }

  removeCustomerFromList(index: number) {
    if (index != -1) {
     this.customers.splice(index, 1);
    }
  }

}
