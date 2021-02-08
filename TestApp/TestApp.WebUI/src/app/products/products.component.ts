import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<Product>;
  categories: Array<Category>;
  searchName: string;
  startDate: string;
  lastDate: string;
  categoriesFilter: Array<Category>;
  isShown: boolean = false;
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });

    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  resetDates(){
    this.startDate = "2000-01-01";
    this.lastDate = new Date().toISOString().slice(0,10); 
  }

  resetSelectedCategories(){
    this.categoriesFilter = Array<any>();
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }
}
