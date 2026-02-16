import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";

import { Product } from "../../interfaces/product.interface";
import { CartItem } from "../../interfaces/cart-item.interface";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "cart-item-control",
  templateUrl: "cart-item-control.component.html",
  styleUrls: ["cart-item-control.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [CommonModule]
})
export class CartItemControlComponent implements OnInit {
  @Input() product: Product;

  item: CartItem;
  cartItem$: Subscription;

  constructor(public cart: CartService) {}

  ngOnInit() {
    this.item = this.cart.getItem(this.product.id);
    this.cartItem$ = this.cart
      .getItemUpdates(this.product.id)
      .subscribe((item) => {
        this.item = item;
      });
  }
}
