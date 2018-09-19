import { Component, Input } from '@angular/core';

import { Customer } from '../../models/customer';
import { User } from '../../models/user';

@Component({
  selector: 'last-transaction',
  templateUrl: 'last-transaction.html'
})
export class LastTransactionComponent {

  @Input() customer: Customer;
  @Input() user: User;

  constructor() {}

}
