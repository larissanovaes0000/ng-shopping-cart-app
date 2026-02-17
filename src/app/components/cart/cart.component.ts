import { Component } from "@angular/core";
import { CartService } from "@services/cart/cart.service";
import { map } from "rxjs/internal/operators/map";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent {
  openCartInformation = false;
  cartItems$ = this.cartService.getCartItems();
  totalQuantity$ = this.cartService.getTotalQuantity();
  totalAmount$ = this.cartService.getTotalAmount();
  emptyCart$ = this.cartItems$.pipe(map((items: any[]) => items.length === 0));

  constructor(private cartService: CartService) {}

  clearCart() {
    this.cartService.clearCart();
  }

  handleCartInformation() {
    this.openCartInformation = !this.openCartInformation;
  }
}
