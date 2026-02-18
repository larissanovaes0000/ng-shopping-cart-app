import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CartService } from "@services/cart/cart.service";
import { ASSETS } from "app/shared/constants/assets.constants";
import { BehaviorSubject, of } from "rxjs";

import { CartComponent } from "./cart.component";

describe("CartComponent", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let items$: BehaviorSubject<any[]>;

  beforeEach(async(() => {
    items$ = new BehaviorSubject<any[]>([]);
    cartService = jasmine.createSpyObj("CartService", [
      "getCartItems",
      "getTotalQuantity",
      "getTotalAmount",
      "clearCart",
      "removeProduct",
    ]);
    cartService.getCartItems.and.returnValue(items$.asObservable());
    cartService.getTotalQuantity.and.returnValue(of(0));
    cartService.getTotalAmount.and.returnValue(of(0));

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [{ provide: CartService, useValue: cartService }],
    })
      .overrideComponent(CartComponent, { set: { template: "" } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("toggles cart information visibility", () => {
    expect(component.openCartInformation).toBe(false);
    component.handleCartInformation();
    expect(component.openCartInformation).toBe(true);
  });

  it("clears cart", () => {
    component.clearCart();
    expect(cartService.clearCart).toHaveBeenCalled();
  });

  it("removes product", () => {
    component.removeProduct(5);
    expect(cartService.removeProduct).toHaveBeenCalledWith(5);
  });

  it("exposes cart icons", () => {
    expect(component.cartIcon).toBe(ASSETS.CART_ICON);
    expect(component.downIcon).toBe(ASSETS.DOWN_ICON);
  });

  it("emits empty cart state", () => {
    let isEmpty = false;
    component.emptyCart$.subscribe((value) => (isEmpty = value));

    expect(isEmpty).toBe(true);

    items$.next([{ product: { id: 1, name: "A", price: 10 }, quantity: 1 }]);
    expect(isEmpty).toBe(false);
  });
});

