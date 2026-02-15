import { NgModule } from "@angular/core";

import { CartItemControlComponent } from "./cart-item-control/cart-item-control.component";
import { CartComponent } from "./cart/cart.component";
import { ProductsListComponent } from "./product-list/products-list.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { NavbarComponent } from './navbar/navbar.component';

const components = [
  ProductsListComponent,
  CartComponent,
  CartItemControlComponent,
  ProductFormComponent,
  NavbarComponent
];

@NgModule({
  imports: [...components],
  exports: [...components],
})
export class ComponentsModule {}
