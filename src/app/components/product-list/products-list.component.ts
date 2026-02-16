import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForProductDirective } from '../../directives/for-product.directive';
import { Product } from '../../interfaces/product.interface';
import { ProductsListService } from '../../services/products-list/products-list';
import { CartItemControlComponent } from '@components/cart-item-control/cart-item-control.component';

@Component({
    selector: 'products-list',
    templateUrl: 'products-list.component.html',
    styleUrls: ['products-list.component.scss'],
    standalone: true,
    imports: [CommonModule, CartItemControlComponent, ForProductDirective],
    providers: [ProductsListService]
})
export class ProductsListComponent implements OnInit, AfterContentInit, AfterViewInit {
    @ViewChild(ForProductDirective, { read: ForProductDirective, static: true }) defaultTemplate: ForProductDirective;

    @ContentChildren(ForProductDirective, { read: ForProductDirective }) productContainers = new QueryList<ForProductDirective>();

    @Input() products: Product[];

    templates: { [type: string]: TemplateRef<any> } = {};

    constructor(private productsListService: ProductsListService) { }

    ngOnInit() {
        this.productsListService.getProductsList().subscribe(products => {
            console.log(products) 
        });
    }

    ngAfterContentInit(): void {
        this.productContainers.forEach(container => {
            this.templates[container.forProductOfType] = container.template;
        });
    }

    ngAfterViewInit(): void {
    }

    getTemplate(product: Product): TemplateRef<any> {
        let template: TemplateRef<any>;

        if (product.type) {
            template = this.templates[product.type];
        }

        return template;
    }

    getContext(product: Product) {
        return {
            $implicit: product,
        };
    }
}
