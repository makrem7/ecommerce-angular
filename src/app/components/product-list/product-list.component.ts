import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products:Product[] = [];
  currentCategoryId: number = 1;
  searchMode : boolean = false;

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
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode){
      this.handleSearchproducts();
    }
    else{
      this.handleListproducts();
    }
  }
  handleSearchproducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data
      }
    );
  }
  handleListproducts():void{
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
