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
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    return value.slice(0, 30) + '...';
  }
}
