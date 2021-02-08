import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductslistComponent } from './productslist/productslist.component';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { TextfilterPipe } from './pipes/textfilter.pipe';
import { FormsModule }   from '@angular/forms';
import { DateRangePipe } from './pipes/date-range.pipe';
import { AddProductComponent } from './shared/add-product/add-product.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { UpdateProductComponent } from './shared/update-product/update-product.component';
import { DeletePostComponent } from './shared/delete-post/delete-post.component';
import { CategoryfilterPipe } from './pipes/categoryfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductslistComponent,
    ProductsComponent,
    TextfilterPipe,
    DateRangePipe,
    AddProductComponent,
    UpdateProductComponent,
    DeletePostComponent,
    CategoryfilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [ProductService, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
