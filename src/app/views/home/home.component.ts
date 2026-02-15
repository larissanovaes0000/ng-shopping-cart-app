import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../core/interfaces/product.interface';
import { CoreModule } from '../../core/core.module';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductsListComponent } from '../../components/product-list/products-list.component';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
    selector: 'home-page',
    templateUrl: 'home.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.Default,
    standalone: true,
    imports: [CommonModule, AsyncPipe, CoreModule, ProductFormComponent, ProductsListComponent, CartComponent]
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
