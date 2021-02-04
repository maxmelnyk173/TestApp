import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/Product';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsPath = environment.apiUrl + "products";
  private categoryPath = environment.apiUrl + "categories";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Product>>{
    return this.http.get<Array<Product>>(this.productsPath);
  }

  getCategories(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(this.categoryPath);
  }

  create(data): Observable<Product>{
    return this.http.post<Product>(this.productsPath, data);
  }

  delete(id){
    return this.http.delete(this.productsPath + "/" + id);
  }
}
