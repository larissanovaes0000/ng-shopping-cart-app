import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { fromEvent, merge, Observable, of } from "rxjs";

import { Product } from "../../core/interfaces/product.interface";
import { ProductsService } from "@services/products-service/products.service";
import { map, startWith } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ViewportService } from "@services/viewport/viewport.service";

@Component({
  selector: "home-page",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomePageComponent{
  products$ = this.productsService.products$;

  showSortOptions = false;

  isMobile$ = this.viewportService.isMobile$;

  constructor(
    private productsService: ProductsService,
    private viewportService: ViewportService
  ) {}

  toggleSortOptions() {
    this.showSortOptions = !this.showSortOptions;
  }
}
