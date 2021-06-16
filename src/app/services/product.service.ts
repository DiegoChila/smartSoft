import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IncrementStock } from '../models/products/dto/increment-stock';
import { Product } from '../models/products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(`${this.apiUrl}products`);
  }

  incrementProduct(incremetStock: IncrementStock) {
    return this.http.put(`${this.apiUrl}products/incrementStock`, incremetStock);
  }

  createNewProduct(product: Product) {
    return this.http.post(`${this.apiUrl}products`, product);
  }
}
