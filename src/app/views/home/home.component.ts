import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { fromEvent, merge, Observable, of } from "rxjs";

import { Product } from "../../core/interfaces/product.interface";
import { ProductsService } from "@services/products-service/products.service";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "home-page",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomePageComponent implements OnInit {
  products$: Observable<Product[]>;
  showSortOptions = false;

  isMobile$ = merge(of(window.innerWidth), fromEvent(window, "resize")).pipe(
    map(() => window.innerWidth <= 767),
  );

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getProductsList();
  }

  getProductsList() {
    this.productsService.getProducts().subscribe((data: Product[]) => {
      this.products$ = of(data);
    });
  }

  toggleSortOptions() {
    this.showSortOptions = !this.showSortOptions;
  }

  onSortChange(order: 'asc' | 'desc') {
    if (order === 'asc') {
      this.products$ = this.products$.pipe(
        map((products) => [...products].sort((a, b) => a.price - b.price))
      );
    } else {
      this.products$ = this.products$.pipe(
        map((products) => [...products].sort((a, b) => b.price - a.price))
      );
    }
  }

  sortLowToHight() {
    this.products$ = this.products$.pipe(
      map((products) => [...products].sort((a, b) => a.price - b.price)),
    );
  }

  sortHighToLow() {
    this.products$ = this.products$.pipe(
      map((products) => [...products].sort((a, b) => b.price - a.price)),
    );
  }
}
