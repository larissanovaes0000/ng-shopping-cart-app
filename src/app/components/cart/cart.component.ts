import { Component } from "@angular/core";
import { CartService } from "@services/cart/cart.service";
import { ASSETS } from "app/shared/constants/assets.constants";
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

  cartIcon = ASSETS.CART_ICON;
  downIcon = ASSETS.DOWN_ICON

  constructor(private cartService: CartService) {}

  clearCart() {
    this.cartService.clearCart();
  }

  handleCartInformation() {
    this.openCartInformation = !this.openCartInformation;
  }

  removeProduct(productId: number) {
    this.cartService.removeProduct(productId);
  }
}

