import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {
    const existingCartItem = this.findCartItemById(cartItem.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }

  private findCartItemById(itemId: string): CartItem | undefined {
    return this.cartItems.find(item => item.id === itemId);
  }

   computeCartTotals() {
    // Implement your logic to calculate total price and quantity
    let totalPrice = 0;
    let totalQuantity = 0;

    this.cartItems.forEach(item => {
      totalPrice += item.unitPrice * item.quantity;
      totalQuantity += item.quantity;
    });

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    this.logCartData(totalPrice, totalQuantity);
  }

  private logCartData(totalPrice: number, totalQuantity: number) {
    console.log('Cart Data: ', {
      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
      cartItems: this.cartItems
    });
  }
}
