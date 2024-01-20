import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products:Product[] = [];
  constructor( private productService:ProductService ){}

  ngOnInit(){
    this.listProducts();
  }

  listProducts():void{
    this.productService.getProductlist().subscribe(
      data => {
        this.products=data;
      }
    )
  }

}
