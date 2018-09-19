import { Customer } from './customer';

export class UpdatedCustomer {
	customer: Customer;
	shouldHighlight: boolean;
	shouldRemove: boolean

	constructor(customer: Customer, shouldHighlight: boolean, shouldRemove: boolean) {
		this.customer = customer;
		this.shouldHighlight = shouldHighlight;
		this.shouldRemove = shouldRemove;
	}
}