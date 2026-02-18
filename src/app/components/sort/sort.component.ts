import { Component, ElementRef } from "@angular/core";
import { ProductsService } from "@services/products/products.service";
import { ClickOutsideListener } from "app/shared/utils/click-outside-listener";

export type SortOrder = "asc" | "desc";

@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.scss"],
})
export class SortComponent extends ClickOutsideListener {
  showSortOptions = false;

  constructor(
    private productsService: ProductsService,
    elementRef: ElementRef<HTMLElement>
  ) {
    super(elementRef);
  }

  toggleSortOptions() {
    this.showSortOptions = !this.showSortOptions;
  }

  protected get isOpened(): boolean {
    return this.showSortOptions;
  }

  protected closeOnOutsideClick(): void {
    this.showSortOptions = false;
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
