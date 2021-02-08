import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent {

  productId: number;
  productName: string;
  event: EventEmitter<any> = new EventEmitter();
  
  constructor(private bsModalRef: BsModalRef, private productService: ProductService) { }

  deletePost() {
    console.log(this.bsModalRef.content.productId)
    this.productService.deleteProduct(this.bsModalRef.content.productId).subscribe(data => {      
      this.event.emit('OK');
      this.bsModalRef.hide();      
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }
}
