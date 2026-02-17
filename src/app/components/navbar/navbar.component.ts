import { Component, OnInit } from "@angular/core";
import { CartService } from "@services/cart/cart.service";
import { map } from "rxjs/internal/operators/map";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  openCartInformation = false;
  cartItems$ = this.cartService.getCartItems();
  totalQuantity$ = this.cartService.getTotalQuantity();
  totalAmount$ = this.cartService.getTotalAmount();
  emptyCart$ = this.cartItems$.pipe(map((items) => items.length === 0));

  constructor(private cartService: CartService) {}

  ngOnInit(): void { }

  handleCartInformation() {
    this.openCartInformation = !this.openCartInformation;
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
