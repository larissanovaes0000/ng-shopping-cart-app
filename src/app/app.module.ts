import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

// Allow use of require() in this file for dynamic optional imports.
declare const require: any;

// Load in-memory API only in development without a static import so the
// dependency can be removed for production/when upgrading Angular.
let inMemoryModule: any[] = [];
if (!environment.production) {
  try {
    // Use require inside try/catch so app still builds when the package is
    // not installed (we removed it from package.json to allow Angular upgrades).
    const inMemory = require('angular-in-memory-web-api');
    // Provide a minimal inline in-memory DB service so we don't need to
    // statically import the project's in-memory file (which may reference
    // the removed package). This keeps the dev backend available when the
    // package is installed, and avoids TypeScript compilation errors when
    // it's not.
    class InMemoryBackendService {
      createDb() {
        return { products: [] };
      }
    }
    inMemoryModule = [inMemory.HttpClientInMemoryWebApiModule.forRoot(InMemoryBackendService)];
  } catch (e) {
    // module not installed — skip in-memory API in development
    inMemoryModule = [];
  }
}

import { AppComponent } from './app.component';
import { HomePageComponent } from './views/home/home.component';
import { ProductsDataService } from './services/products-data.service';
import { ProductsService } from './services/products.service';
import { CartDataService } from './services/cart-data.service';
import { CartService } from './services/cart.service';
import { CoreModule } from './core/core.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ...inMemoryModule,
    ComponentsModule,
    CoreModule
  ],
  providers: [
    ProductsDataService,
    ProductsService,
    CartDataService,
    CartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
