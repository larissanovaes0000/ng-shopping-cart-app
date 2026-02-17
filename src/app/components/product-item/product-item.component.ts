import { Component, Input, OnInit } from "@angular/core";
import { CartService } from "@services/cart/cart.service";
import { Product } from "app/core/interfaces/product.interface";
import { Subject } from "rxjs/internal/Subject";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;

  private destroy$ = new Subject<void>();

  quantity = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateProductsState();
  }

  updateProductsState() {
    this.cartService
      .getCartItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => {
        const item = items.find((i) => i.product.id === this.product.id);
        this.quantity = item ? item.quantity : 0;
      });
  }

  addToCart() {
    this.quantity = 1;
    this.cartService.addProduct(this.product);
  }

  increase() {
    this.quantity++;
    this.cartService.addProduct(this.product);
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartService.updateQuantity(this.product.id, this.quantity);
    } else {
      this.quantity = 0;
      this.cartService.removeProduct(this.product.id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
