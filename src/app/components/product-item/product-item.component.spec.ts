import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from '@services/cart/cart.service';
import { BehaviorSubject } from 'rxjs';

import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let cartItems$: BehaviorSubject<any[]>;
  const product = { id: 1, name: 'Phone', price: 100, imgUrl: 'bad-url' };

  beforeEach(async(() => {
    cartItems$ = new BehaviorSubject<any[]>([]);
    cartService = jasmine.createSpyObj('CartService', [
      'addProduct',
      'updateQuantity',
      'removeProduct',
      'getCartItems',
    ]);
    cartService.getCartItems.and.returnValue(cartItems$.asObservable());

    TestBed.configureTestingModule({
      declarations: [ ProductItemComponent ],
      providers: [{ provide: CartService, useValue: cartService }],
    })
    .overrideComponent(ProductItemComponent, { set: { template: '' } })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component.product = { ...product };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds to cart', () => {
    component.addToCart();
    expect(component.quantity).toBe(1);
    expect(cartService.addProduct).toHaveBeenCalledWith(component.product);
  });

  it('increases quantity', () => {
    component.quantity = 1;
    component.increase();
    expect(component.quantity).toBe(2);
    expect(cartService.addProduct).toHaveBeenCalledWith(component.product);
  });

  it('decreases quantity and updates cart when quantity > 1', () => {
    component.quantity = 2;
    component.decrease();
    expect(component.quantity).toBe(1);
    expect(cartService.updateQuantity).toHaveBeenCalledWith(component.product.id, 1);
  });

  it('removes product when quantity reaches zero', () => {
    component.quantity = 1;
    component.decrease();
    expect(component.quantity).toBe(0);
    expect(cartService.removeProduct).toHaveBeenCalledWith(component.product.id);
  });

  it('updates quantity from cart stream', () => {
    cartItems$.next([
      { product: { id: 1, name: 'Phone', price: 100 }, quantity: 4, amount: 0, subtotal: 0 },
    ]);

    expect(component.quantity).toBe(4);
  });

  it('uses placeholder image on image load error', () => {
    component.onImageError();
    expect(component.product.imgUrl).toBe(component.placeholderImage);
  });
});
