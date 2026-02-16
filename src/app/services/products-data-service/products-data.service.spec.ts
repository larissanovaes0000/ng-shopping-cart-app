import { HttpClient } from "@angular/common/http";

import { ProductsDataService } from "./products-data.service";

describe("ProductsDataService", () => {
  let http: jasmine.SpyObj<HttpClient>;
  let service: ProductsDataService;

  beforeEach(() => {
    http = jasmine.createSpyObj("HttpClient", ["get", "post", "put", "delete"]);
    service = new ProductsDataService(http);
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("fetchAll uses products endpoint", () => {
    service.fetchAll();
    expect(http.get).toHaveBeenCalledWith("http://localhost/api/products/");
  });
});
