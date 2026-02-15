import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class CartComponent {
    items$: Observable<any[]>;
    total$: Observable<number>;

    constructor(
        public cart: CartService,
    ) {
        cart.getStoredCartItems();

        this.items$ = cart.getCartUpdates();
        this.total$ = cart.getTotalUpdates();
    }
}
