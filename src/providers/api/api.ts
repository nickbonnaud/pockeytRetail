import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';

import { Environment } from '../../environment/environment';
import 'rxjs/add/observable/throw';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
	private DEFAULT_URL: string = `${Environment.DEVELOPMENT.API_URL}`

  constructor(private http: HttpClient) {}

  get(endpoint: string, params?:any, url?: string, paramsToAppend?: any, header?: string): Observable<any> {
  	let baseApi: string = url ? url : this.DEFAULT_URL;
  	let options: any = {};
  	var httpParams: HttpParams = new HttpParams();

  	if (params) {
      options['params'] = this.formatHttpParams(params);
    }
    if (paramsToAppend) {
      options['params'] = this.formatParamsToAppend(paramsToAppend, httpParams);
    }
  	options['headers'] = this.formatHeaders(header);

    return this.http.get<any>(baseApi + '/' + endpoint, options)
  		.pipe(
  			tap(res => console.log(res)),
  			catchError(this.handleError)
  		);
  }

  post(endpoint: string, body: any, params?: any, url?: string, header?: string): Observable<any> {
    let baseApi = url ? url : this.DEFAULT_URL;
    let options: any = {};
    var httpParams = new HttpParams();

    if (params) {
      options['params'] = this.formatHttpParams(params);
    }
    options['headers'] = this.formatHeaders(header);

    return this.http.post<any>(baseApi + '/' + endpoint, body, options)
      .pipe(
        tap(res => console.log(res)),
        catchError(this.handleError)
      );
  }



  

  handleError(response: Response | any) {
		let errMsg: string;
		if (response instanceof Response) {
			const err = response || '';
			errMsg = `${response.status} - ${response.statusText || ''} ${err}`;
		} else if (response.error) {
      errMsg = response.error;
    } else {
			errMsg = response.message ? response.message : response.toString();
		}
		return Observable.throw(errMsg);
  }


  formatHeaders(header: string): HttpHeaders {
    if (header) {
  		return new HttpHeaders().set('Authorization', header);
  	}
  }

  formatParamsToAppend(paramsToAppend: any, httpParams: HttpParams): HttpParams {
  	if (paramsToAppend) {
  		for (let paramKey in paramsToAppend) {
	  		paramsToAppend[paramKey].forEach(id => {
	  			httpParams.append(paramKey, id);
	  		});
	  	}
  	}
  	return httpParams;
  }

  formatHttpParams(params: any): HttpParams {
  	 return Object.getOwnPropertyNames(params)
  		.reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }
}
