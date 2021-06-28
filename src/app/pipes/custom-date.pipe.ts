import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: Date, ...args: unknown[]): unknown {
    let date = this.datePipe.transform(value, 'E d MMMM ');
    date = date
      ?.replace('.', ',')
      .split(' ')
      .map((word) => word && word.replace(/./, (c) => c.toUpperCase()))
      .join(' ')!;

    return date;
  }
}
