import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer'; 

import { ApiProvider } from '../providers/api/api';
import { Environment } from '../environment/environment';

@Injectable()
export class EmailValidator {

	constructor(private api: ApiProvider) {}

	checkCorrectEmail(control: FormControl): any {
		return Observable.timer(800).switchMap(() => {
			let params = {'email': control.value.toLowerCase(), 'unique': true};
			return this.api.get('user', params, Environment.DEVELOPMENT.MOBILE_URL).map((data) => {
				if (!data.unique) {
					return null;
				} else {
					return {"notExists": true};
				}
			})
		})
	}
}