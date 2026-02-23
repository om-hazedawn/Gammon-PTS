import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'perMillion', standalone: true })
export class PerMillionPipe implements PipeTransform {
  transform(value: number, rounding = 2): string {
    if (value < 10000000) { // less then 10M
      return Number((value / 1000000).toFixed(rounding)).toLocaleString('en-US');
    }

    return Math.round((value / 1000000)).toLocaleString('en-US');
  }
}
