import { Component, EventEmitter, Output } from "@angular/core";
import { ProductsService } from "@services/products/products.service";
import { ViewportService } from "@services/viewport/viewport.service";

export type SortOrder = "asc" | "desc";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.scss"],
})
export class SortComponent {

  showSortOptions = false;

  constructor( private productsService: ProductsService) {}

  toggleSortOptions() {
    this.showSortOptions = !this.showSortOptions;
  }

  sortLowToHigh() {
    this.productsService.setSortOrder("asc");
    this.showSortOptions = false;
  }

  sortHighToLow() {
    this.productsService.setSortOrder("desc");
    this.showSortOptions = false;
  }

}
