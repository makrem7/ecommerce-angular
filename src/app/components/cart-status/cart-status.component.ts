import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [CurrencyPipe,RouterModule],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent{
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.totalPrice.subscribe((price: number) => {
      this.totalPrice = price;
      // Add any additional logic you want when the total price changes
    });

    this.cartService.totalQuantity.subscribe((quantity: number) => {
      this.totalQuantity = quantity;
      // Add any additional logic you want when the total quantity changes
    });
  }
}
