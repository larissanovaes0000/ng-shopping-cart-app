import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ProductFormComponent } from "./product-form/product-form.component";
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductItemComponent } from "./product-item/product-item.component";
import { AlertComponent } from '../shared/components/alert/alert.component';
import { SortComponent } from './sort/sort.component';
import { CartComponent } from './cart/cart.component';
import { NgxMaskModule } from "ngx-mask";

const components = [
  ProductFormComponent,
  NavbarComponent,
  ProductItemComponent,
  AlertComponent,
  SortComponent,
  CartComponent
];

@NgModule({
  declarations: [...components],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
  exports: [...components],
})
export class ComponentsModule {}

