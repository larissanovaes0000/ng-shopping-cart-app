import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CartService } from "@services/cart/cart.service";
import { of } from "rxjs";

import { CartComponent } from "./cart.component";

describe("CartComponent", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async(() => {
    cartService = jasmine.createSpyObj("CartService", [
      "getCartItems",
      "getTotalQuantity",
      "getTotalAmount",
      "clearCart",
      "removeProduct",
    ]);
    cartService.getCartItems.and.returnValue(of([]));
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
});
