import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { response } from 'express';
import { map } from "rxjs/operators";
 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) { }

  getProductlist(gategoryId:number):Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/search/findByCategoryId?id=${gategoryId}`;    

    return this.httpClient.get<GetResponse>(searchUrl).pipe(map(response=>{      
      return response._embedded.products
      }))
  }

 
}
interface GetResponse {
  _embedded:{
    products: Product[]
  }
}