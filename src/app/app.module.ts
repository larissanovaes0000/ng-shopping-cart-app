import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
import { AlertService } from "@services/alert/alert.service";
import { ProductsService } from "@services/products/products.service";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { CoreModule } from "./core/core.module";
import { CartService } from "./services/cart/cart.service";
import { HomePageComponent } from "./views/home/home.component";
import { ViewportService } from "@services/viewport/viewport.service";
import { AppRoutingModule } from "./app-routing.module";
import { NotFoundComponent } from './views/not-found/not-found.component';
import { NgxMaskModule } from "ngx-mask";

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent, NotFoundComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    ComponentsModule, 
    CoreModule,
    AppRoutingModule,
    NgxMaskModule.forRoot() 
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" },
    ProductsService,
    CartService,
    AlertService,
    ViewportService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
