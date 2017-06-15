import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortifyDescription'})
export class ShortifyDescriptionPipe implements PipeTransform {
  transform(description: string, length: number): string {
    if (description.length <= length) {
      return description;
    }
    description = description.slice(0, length)
    let a = description.split(' ');
    a.splice(a.length - 1, 1);
    description = a.join(' ');
    return description + '...';
  }
}
