import { Component } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(price => this.totalPrice = price);
    this.cartService.totalQuantity.subscribe(qt => this.totalQuantity = qt);
    this.cartService.computeCartTotals();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    const existingCartItem = this.findCartItemById(cartItem.id);

    if (existingCartItem && existingCartItem.quantity > 1) {
      existingCartItem.quantity--;
    } else {
      this.removeCartItem(cartItem.id);
    }

    this.cartService.computeCartTotals();
  }

  findCartItemById(itemId: string): CartItem | undefined {
    return this.cartItems.find(item => item.id === itemId);
  }

  removeCartItem(itemId: string) {
    const itemIndex = this.cartItems.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
    }

    this.cartService.computeCartTotals();
  }
}