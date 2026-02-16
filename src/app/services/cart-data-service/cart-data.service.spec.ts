import { HttpClient } from "@angular/common/http";

import { CartDataService } from "./cart-data.service";

describe("CartDataService", () => {
  let http: jasmine.SpyObj<HttpClient>;
  let service: CartDataService;

  beforeEach(() => {
    http = jasmine.createSpyObj("HttpClient", ["get", "post", "put", "delete"]);
    service = new CartDataService(http);
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("persists item using product id when item id is missing", () => {
    const item: any = {
      amount: 1,
      subtotal: 100,
      product: { id: 123, name: "Phone", price: 100 },
    };

    service.persist(item);

    expect(item.id).toBe(123);
    expect(http.put).toHaveBeenCalledWith("http://localhost/api/cart/123", item);
  });

  it("removes item when amount is zero or less", () => {
    const item: any = {
      id: 10,
      amount: 0,
      subtotal: 0,
      product: { id: 10, name: "Phone", price: 100 },
    };

    service.persist(item);

    expect(http.delete).toHaveBeenCalledWith("http://localhost/api/cart/10");
  });
});
