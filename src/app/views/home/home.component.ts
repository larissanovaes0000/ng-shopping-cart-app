import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartComponent } from '@components/cart/cart.component';
import { ProductFormComponent } from '@components/product-form/product-form.component';
import { ProductsListComponent } from '@components/product-list/products-list.component';

import { AsyncPipe, CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'home-page',
    templateUrl: 'home.component.html',
    styles: [],
    standalone: true,
    imports: [ProductsListComponent, ProductFormComponent, CartComponent, AsyncPipe, CommonModule]
})
export class HomePageComponent implements OnInit {
    products$: Observable<Product[]>;

    constructor(
        public products: ProductsService,
    ) {
        this.products$ = this.products.fetchAll();
    }

    ngOnInit() {
    }
}
