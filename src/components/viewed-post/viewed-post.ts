import { Component, Input } from '@angular/core';

import { Customer } from '../../models/customer';
import { User } from '../../models/user';

/**
 * Generated class for the ViewedPostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'viewed-post',
  templateUrl: 'viewed-post.html'
})
export class ViewedPostComponent {

  @Input() customer: Customer;
  @Input() user: User;

  constructor() {}

}
