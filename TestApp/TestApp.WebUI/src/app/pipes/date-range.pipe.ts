import { Product } from '../models/Product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {
  pipe: any;

  transform( products: Product[], arg1:Date, arg2:Date, ): Product[] {
    if(!arg1 || !arg2){
      return products;
    }
    else{
      return products.filter(product => new Date(product.releasedOn) >= new Date(arg1) && new Date(product.releasedOn) <= new Date(arg2));
    } 
  }
}
