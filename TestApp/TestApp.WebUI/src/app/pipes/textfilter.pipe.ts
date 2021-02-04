import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textfilter'
})
export class TextfilterPipe implements PipeTransform {

  transform( array: Array<any>, filterField: string, filterValue: string ): Array<any> {
    if (!array) return [];
    return array.filter(item => item[filterField] == filterValue);
}
}
