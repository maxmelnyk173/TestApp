import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css']
})
export class ProductslistComponent implements OnInit {

  createProductForm: FormGroup;
  products: Array<Product>;
  categories: Array<Category>;
  productForm: Product;

  constructor(private fb: FormBuilder, private productService: ProductService) { 
    this.createProductForm = this.fb.group({
      ProductName : [''],
      Version : [''],
      Size : [''],
      CompanyName : [''],
      URL : [''],
      VendorContact : [''],
      ReleasedOn : [''],
      CategoryVms: ['']
    })
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts(){
    this.productService.getAll().subscribe(products => {
      this.products = products;
      console.log(this.products);
    });
  }

  fetchCategories(){
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  createProduct(){
    this.productService.create(this.createProductForm.value).subscribe(res => {
      this.fetchProducts();
      this.fetchCategories();
    })
  }

  deleteProduct(id){
    this.productService.delete(id).subscribe(res => {
      this.fetchProducts();
      this.fetchCategories();
    })
  }
}
