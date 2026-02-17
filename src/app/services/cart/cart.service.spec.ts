import { TestBed } from "@angular/core/testing";

import { CartService } from "./cart.service";

describe("CartService", () => {
  const productA = { id: 123, price: 100, name: "Motorola" };
  const productB = { id: 124, price: 150, name: "Fancy Car" };

  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("adds product and aggregates same product quantity", () => {
    service.addProduct(productA);
    service.addProduct(productA);

    const items = service.cartSubject.value;
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
  });

  it("removes product by id", () => {
    service.addProduct(productA);
    service.addProduct(productB);

    service.removeProduct(productA.id);

    const items = service.cartSubject.value;
    expect(items.length).toBe(1);
    expect(items[0].product.id).toBe(productB.id);
  });

  it("updates quantity and removes item when quantity is zero", () => {
    service.addProduct(productA);
    service.updateQuantity(productA.id, 3);
    expect(service.cartSubject.value[0].quantity).toBe(3);

    service.updateQuantity(productA.id, 0);
    expect(service.cartSubject.value.length).toBe(0);
  });

  it("calculates total quantity", () => {
    let total = 0;
    service.getTotalQuantity().subscribe((value) => (total = value));

    service.addProduct(productA);
    service.addProduct(productA);
    service.addProduct(productB);

    expect(total).toBe(3);
  });

  it("calculates total amount", () => {
    let total = 0;
    service.getTotalAmount().subscribe((value) => (total = value));

    service.addProduct(productA);
    service.addProduct(productA);
    service.addProduct(productB);

    expect(total).toBe(350);
  });

  it("persists items in localStorage", () => {
    service.addProduct(productA);

    const stored = JSON.parse(localStorage.getItem("app_cart") || "[]");
    expect(stored.length).toBe(1);
    expect(stored[0].product.id).toBe(productA.id);
  });

  it("loads items from localStorage", () => {
    localStorage.setItem(
      "app_cart",
      JSON.stringify([{ product: productA, quantity: 2, amount: 0, subtotal: 0 }]),
    );

    const reloaded = new CartService();
    expect(reloaded.cartSubject.value.length).toBe(1);
    expect(reloaded.cartSubject.value[0].quantity).toBe(2);
  });

  it("clears cart on clearCart", () => {
    service.addProduct(productA);
    service.clearCart();

    expect(service.cartSubject.value).toEqual([]);
    expect(localStorage.getItem("app_cart")).toBeNull();
  });

  it("clears cart on logout", () => {
    service.addProduct(productA);
    service.logout();

    expect(service.cartSubject.value).toEqual([]);
    expect(localStorage.getItem("app_cart")).toBeNull();
  });
});
