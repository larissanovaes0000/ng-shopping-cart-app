import { Component, ElementRef } from "@angular/core";
import { CartService } from "@services/cart/cart.service";
import { ASSETS } from "app/shared/constants/assets.constants";
import { ClickOutsideListener } from "app/shared/utils/click-outside-listener";
import { map } from "rxjs/internal/operators/map";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent extends ClickOutsideListener {
  openCartInformation = false;
  cartItems$ = this.cartService.getCartItems();
  totalQuantity$ = this.cartService.getTotalQuantity();
  totalAmount$ = this.cartService.getTotalAmount();
  emptyCart$ = this.cartItems$.pipe(map((items: any[]) => items.length === 0));

  cartIcon = ASSETS.CART_ICON;
  downIcon = ASSETS.DOWN_ICON;

  constructor(private cartService: CartService, elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  handleCartInformation() {
    this.openCartInformation = !this.openCartInformation;
  }

  protected get isOpened(): boolean {
    return this.openCartInformation;
  }

  protected closeOnOutsideClick(): void {
    this.openCartInformation = false;
  }

  removeProduct(productId: number) {
    this.cartService.removeProduct(productId);
  }
}

