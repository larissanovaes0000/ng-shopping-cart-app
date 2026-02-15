import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CartItemControlComponent } from "./cart-item-control/cart-item-control.component";
import { CartComponent } from "./cart/cart.component";
import { ProductsListComponent } from "./product-list/products-list.component";
import { CoreModule } from "../core/core.module";
import { ProductFormComponent } from "./product-form/product-form.component";
import { NavbarComponent } from './navbar/navbar.component';

const components = [
  ProductsListComponent,
  CartComponent,
  CartItemControlComponent,
  ProductFormComponent,
];

@NgModule({
  declarations: [components, NavbarComponent],
  imports: [BrowserModule, CoreModule],
  exports: [components],
})
export class ComponentsModule {}
