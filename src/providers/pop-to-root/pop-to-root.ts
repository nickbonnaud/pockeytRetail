import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the PopToRootProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PopToRootProvider {

  public popToRootSource = new Subject<boolean>();
  popToRootSource$ = this.popToRootSource.asObservable();

  constructor() {}

  shouldPopToRoot(goToRoot: boolean) {
  	this.popToRootSource.next(goToRoot);
  }

}
