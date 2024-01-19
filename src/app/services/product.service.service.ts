import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { response } from 'express';
import { map } from "rxjs/operators";
 
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private baseUrl = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) { }

  getProductlist():Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(map(response=>response._embedded.products))
  }

 
}
interface GetResponse {
  _embedded:{
    products: Product[]
  }
}