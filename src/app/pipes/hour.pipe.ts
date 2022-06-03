import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pdHour',
})
export class HourPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value == null) return '00:00';
    const isoString = new Date(value * 1000).toISOString().substr(11, 8);
    const [hours, minutes, seconds] = isoString.split(':');
    return `${hours}:${minutes}:${seconds}`.replace(/^00:/, '');
  }
}
