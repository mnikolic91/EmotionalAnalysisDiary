import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords',
  standalone: true
})
export class TruncateWordsPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';
    let words = value.split(' ');
    if (words.length <= limit) return value;
    return words.slice(0, limit).join(' ') + '...';
  }


}
