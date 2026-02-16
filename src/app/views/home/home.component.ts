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
}
