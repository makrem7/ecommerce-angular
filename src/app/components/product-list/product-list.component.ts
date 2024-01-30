import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe,RouterModule,NgbModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products:Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode : boolean = false;

  // new properties  for pagination
  thePageNumber: number = 1;
  thePageSize: number = 4;
  theTotalElements: number = 0;
  pageSizes: number[] = [4,8,12,16,24,32,40];

  constructor( 
    private productService:ProductService ,
    private cartService:CartService ,
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
    this.productService.searchProducts(theKeyword,this.thePageNumber-1,this.thePageSize).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number+1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements; 
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

    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }
    this.previousCategoryId=this.currentCategoryId;

    this.productService.getProductlistPaginated(this.thePageNumber-1,this.thePageSize,this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number+1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements; 
      }
    )
  }
  
  updatePageSize(pageSelectedPage: string) {
    this.thePageSize = +pageSelectedPage;
    this.listProducts();
  }


  addToCart(product: Product) {
    console.log(product.name, " ", product.unitPrice);
    const cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }
}
