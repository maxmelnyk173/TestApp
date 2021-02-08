import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/Category';
import { Product } from '../models/Product';

@Pipe({
  name: 'categoryfilter'
})
export class CategoryfilterPipe implements PipeTransform {

  transform(products: Product[], filteredCategories: Category[]): Product[] {
    
    if (filteredCategories === undefined || filteredCategories.length == 0) {
      return products;
    }

    let filteredProducts = products;

    for (let item of filteredCategories) {

      filteredProducts = filteredProducts.filter(product => {
        return product.categories.filter(category => { 
          return category.categoryId === item.categoryId; 
         }).length > 0;
      })
    }

    return filteredProducts;
  }
}
