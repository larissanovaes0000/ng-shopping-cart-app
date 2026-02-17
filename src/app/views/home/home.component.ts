import { ChangeDetectionStrategy, Component } from "@angular/core";

import { ProductsService } from "@services/products/products.service";
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
