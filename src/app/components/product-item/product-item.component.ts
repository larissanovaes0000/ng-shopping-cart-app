import { Component, Input, OnInit } from "@angular/core";
import { Product } from "app/core/interfaces/product.interface";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() product!: Product;

  quantity = 0;

  addToCart() {
    this.quantity = 1;
  }

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      this.quantity = 0;
    }
  }
}
