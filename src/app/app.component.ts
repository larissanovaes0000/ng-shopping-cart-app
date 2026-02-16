import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './views/home/home.component';
import { ProductsListService } from '@services/products-list/products-list';
import { ProductsService } from '@services/products.service';
import { ProductsDataService } from '@services/products-data.service';
import { CartService } from '@services/cart.service';
import { CartDataService } from '@services/cart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, HomePageComponent],
  providers: [ProductsListService, ProductsService, ProductsDataService, CartService, CartDataService]
})
export class AppComponent {
  title = 'Shopping App';

  constructor() {
  }
}
