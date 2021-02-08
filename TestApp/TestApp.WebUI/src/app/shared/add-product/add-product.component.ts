import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Category } from '../../models/Category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  createProductForm: FormGroup;
  categories: Array<Category>;
  event: EventEmitter<any>=new EventEmitter();

  constructor(private fb: FormBuilder, private productService: ProductService, private bsModalRef: BsModalRef) { 
    this.createProductForm = this.fb.group({
      productName : [''],
      version : [''],
      size : [''],
      companyName : [''],
      url : [''],
      vendorContact : [''],
      releasedOn : [''],
      categoryVms: ['']
    })

    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onPostFormSubmit(){
    this.productService.createProduct(this.createProductForm.value).subscribe(data=>{
      console.log(data);

      if(data!=null){
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    })
  }

  onClose(){
    this.bsModalRef.hide();
  }
}
