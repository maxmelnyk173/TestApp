import { Product } from '../models/Product';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'textfilter'
})
export class TextfilterPipe implements PipeTransform {

  transform( products: Product[], searchValue?: string): Product[] {
    if (!products || !searchValue){
      return products;
    }

    return products.filter(product => 
      product.productName.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.vendorContact.toLowerCase().includes(searchValue.toLowerCase())
      );
  }
}
