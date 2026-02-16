import {
  ChangeDetectionStrategy,
  Component,
  Input
} from "@angular/core";

import { Product } from "../../core/interfaces/product.interface";

@Component({
  selector: "products-list",
  templateUrl: "products-list.component.html",
  styleUrls: ["products-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductsListComponent {
  @Input() products: Product[];
}
