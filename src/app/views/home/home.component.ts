import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../core/interfaces/product.interface';
import { ProductsService } from '@services/products-service/products.service';

@Component({
    selector: 'home-page',
    templateUrl: 'home.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.Default
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
