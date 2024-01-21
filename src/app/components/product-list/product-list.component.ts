import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products:Product[] = [];
  currentCategoryId: number = 1;

  constructor( 
    private productService:ProductService ,
    private route: ActivatedRoute
    ){}

  ngOnInit(){
    this.route.paramMap.subscribe(()=>
        this.listProducts()
    )
  }

  listProducts():void{

    const hasCategoryId: boolean =this.route.snapshot.paramMap.has("id");

    if (hasCategoryId){
      
      this.currentCategoryId = +this.route.snapshot.paramMap.get("id")!;
    }
    else{
      this.currentCategoryId = 1;
    }

    this.productService.getProductlist(this.currentCategoryId).subscribe(
      data => {
        this.products=data;
      }
    )
  }

}
