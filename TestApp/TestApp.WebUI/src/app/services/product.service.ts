import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsPath = environment.apiUrl + "products";
  private categoryPath = environment.apiUrl + "categories";
  productGuidSource = new  BehaviorSubject<string>(null);
  productGuidData: any;


  constructor(private http: HttpClient) { 
    this.productGuidData= this.productGuidSource.asObservable();
  }

  getAllProducts(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(this.productsPath);
  }

  getCategories(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(this.categoryPath);
  }

  getProductById(id): Observable<Product>{
    return this.http.get<Product>(this.productsPath + "/" + id);
  }

  createProduct(data): Observable<Product>{
    return this.http.post<Product>(this.productsPath, data);
  }

  deleteProduct(id){
    return this.http.delete(this.productsPath + "/" + id);
  }

  updateProduct(id, data){
    return this.http.put(this.productsPath + "/" + id, data);
  }

  getProductGuid(id){
    this.productGuidSource.next(id);
  }
}
