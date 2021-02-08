import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddProductComponent } from '../shared/add-product/add-product.component';
import { UpdateProductComponent } from '../shared/update-product/update-product.component';
import { DeletePostComponent } from '../shared/delete-post/delete-post.component';

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
  bsModalRef: BsModalRef;

  constructor(private productService: ProductService, private bsModalService: BsModalService) { 
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts(){
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  fetchCategories(){
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  addNewProduct(){
    this.bsModalRef = this.bsModalService.show(AddProductComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.fetchProducts();
      }
    });
  }

  deletePost(productId: string, productName: string) {
    this.bsModalRef = this.bsModalService.show(DeletePostComponent);
    this.bsModalRef.content.productId = productId;
    this.bsModalRef.content.productName = productName;
    this.bsModalRef.content.event.subscribe(result => {
      console.log("deleted", result);
      if (result == 'OK') {
        this.fetchProducts();
      }
    });
  }
  
  updateProduct(id) {
    this.productService.getProductGuid(id);
    this.bsModalRef = this.bsModalService.show(UpdateProductComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.fetchProducts();
      }
    });
  }
}
