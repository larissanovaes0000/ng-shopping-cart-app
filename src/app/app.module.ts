import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryBackendService } from "./in-memory-backend-service";

import { AppComponent } from "./app.component";
import { HomePageComponent } from "./views/home/home.component";
import { ProductsDataService } from "./services/products-data-service/products-data.service";
import { ProductsService } from "@services/products-service/products.service";
import { CartDataService } from "./services/cart-data-service/cart-data.service";
import { CartService } from "./services/cart-service/cart.service";
import { CoreModule } from "./core/core.module";
import { ComponentsModule } from "./components/components.module";
import localePt from "@angular/common/locales/pt";
import { registerLocaleData } from "@angular/common";
import { AlertService } from "@services/alert/alert.service";

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent, HomePageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryBackendService),
    ComponentsModule,
    CoreModule,
  ],
  providers: [
    ProductsDataService,
    ProductsService,
    CartDataService,
    CartService,
    AlertService,
    { provide: LOCALE_ID, useValue: "pt-BR" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
