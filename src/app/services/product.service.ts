import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProduct(theProductId: number): Observable<Product> {
    const productUrl: string = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductlistPaginated(thePage:number, thePageSize: number, gategoryId: number): Observable<GetResponseProduct> {
    const searchUrl: string = `${this.baseUrl}/search/findByCategoryId?id=${gategoryId}`
                              +`&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }
  getProductlist(gategoryId: number): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/search/findByCategoryId?id=${gategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string, thePage: number, thePageSize :number): Observable<GetResponseProduct> {
    const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }
  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map((response) => {
        return response._embedded.products;
      })
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(
        map((response) => {
          return response._embedded.productCategory;
        })
      );
  }
}
interface GetResponseProduct {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPage: number,
    number: number,
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
