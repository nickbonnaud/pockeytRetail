import { Component, Input } from '@angular/core';

import { Platform } from 'ionic-angular';

import { Customer } from '../../models/customer';
import { User } from '../../models/user';

/**
 * Generated class for the CustomerAboutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'customer-about',
  templateUrl: 'customer-about.html'
})
export class CustomerAboutComponent {

  @Input() customer: Customer;
  @Input() user: User;

  constructor() {}

}
