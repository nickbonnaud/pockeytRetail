import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the LimitPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'limit',
})
export class LimitPipe implements PipeTransform {
 
  transform(value: string, size: string) {
  	if (size == 'sm') {
  		return value.length > 15 ? value.slice(0, 15) + '...' : value;
  	} else if (size == 'med') {
  		return value.length > 30 ? value.slice(0, 30) + '...' : value;
  	}
  }
}
