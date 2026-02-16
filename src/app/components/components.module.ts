import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CartItemControlComponent } from "./cart-item-control/cart-item-control.component";
import { CartComponent } from "./cart/cart.component";
import { ProductsListComponent } from "./product-list/products-list.component";
import { CoreModule } from "../core/core.module";
import { ProductFormComponent } from "./product-form/product-form.component";
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductItemComponent } from "./product-item/product-item.component";
import { AlertComponent } from './alert/alert.component';
import { SortComponent } from './sort/sort.component';

const components = [
  ProductsListComponent,
  CartComponent,
  CartItemControlComponent,
  ProductFormComponent,
  NavbarComponent,
  ProductItemComponent,
  AlertComponent,
  SortComponent
];

@NgModule({
  declarations: [components, AlertComponent, SortComponent],
  imports: [BrowserModule, CoreModule, FormsModule, ReactiveFormsModule],
  exports: [components],
})
export class ComponentsModule {}
