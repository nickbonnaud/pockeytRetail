import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Customer } from '../../models/customer';

/*
  Generated class for the SelectedCustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SelectedCustomerProvider {

  private selectedCustomerSource = new BehaviorSubject<Customer>(null);
  public selectedCustomerSource$ = this.selectedCustomerSource.asObservable();

  constructor() {}

  setSelectedCustomer(customer: Customer) {
  	this.selectedCustomerSource.next(customer);
  }

}
