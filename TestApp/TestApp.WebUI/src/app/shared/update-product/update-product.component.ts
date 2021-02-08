import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Category } from '../../models/Category';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  updateProductForm: FormGroup;
  categories: Array<Category>;
  event: EventEmitter<any>=new EventEmitter();
  productId: string;
  productInfo: any;

  constructor(private fb: FormBuilder, private productService: ProductService, private bsModalRef: BsModalRef) { 
    this.updateProductForm = this.fb.group({
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

    this.productService.productGuidSource.subscribe(data => {
      this.productId = data;
      if (this.productId !== undefined) {
        this.productService.getProductById(this.productId).subscribe(data => {
          this.productInfo = data;
          
          if (this.updateProductForm!=null && this.productInfo!=null) {
            this.updateProductForm.controls['productName'].setValue(this.productInfo.productName);
            this.updateProductForm.controls['version'].setValue(this.productInfo.version);
            this.updateProductForm.controls['size'].setValue(this.productInfo.size);
            this.updateProductForm.controls['companyName'].setValue(this.productInfo.companyName);
            this.updateProductForm.controls['url'].setValue(this.productInfo.url);
            this.updateProductForm.controls['vendorContact'].setValue(this.productInfo.vendorContact);
          }
        });
      }
    });
  }

  onPostFormSubmit(){
    let postData = {
      'productId': this.productId,
      "productName": this.updateProductForm.get('productName').value,
      "version": this.updateProductForm.get('version').value,
      "size": this.updateProductForm.get('size').value,
      "companyName": this.updateProductForm.get('companyName').value,
      "url": this.updateProductForm.get('url').value,
      "vendorContact": this.updateProductForm.get('vendorContact').value,
      "releasedOn": this.updateProductForm.get('releasedOn').value,
      "categoryVms": this.updateProductForm.get('categoryVms').value
    };

    this.productService.updateProduct(this.productId, postData).subscribe(data => {      
      this.event.emit('OK');
      this.bsModalRef.hide();      
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }
}
