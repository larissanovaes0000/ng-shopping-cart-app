import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Product } from "app/core/interfaces/product.interface";

import { ProductsService } from "./products.service";

describe("ProductsService", () => {
  const API_URL = "http://localhost:3000/products";

  let service: ProductsService;
  let httpMock: HttpTestingController;

  const products: Product[] = [
    { id: 1, name: "A", price: 100 },
    { id: 2, name: "B", price: 50 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe("GET");
    req.flush([]);
    expect(service).toBeTruthy();
  });

  it("loads products on service creation", () => {
    let latest: Product[] | undefined;
    service.products$.subscribe((value) => (latest = value));

    const req = httpMock.expectOne(API_URL);
    req.flush(products);

    expect(latest).toEqual(products);
  });

  it("sorts products by price asc and desc", () => {
    let latest: Product[] = [];
    service.products$.subscribe((value) => (latest = value));

    httpMock.expectOne(API_URL).flush(products);

    service.setSortOrder("asc");
    expect(latest.map((p) => p.id)).toEqual([2, 1]);

    service.setSortOrder("desc");
    expect(latest.map((p) => p.id)).toEqual([1, 2]);
  });

  it("gets all products", () => {
    httpMock.expectOne(API_URL).flush([]);

    service.getProducts().subscribe((response) => {
      expect(response).toEqual(products);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe("GET");
    req.flush(products);
  });

  it("gets one product", () => {
    httpMock.expectOne(API_URL).flush([]);

    service.getProduct(1).subscribe((response) => {
      expect(response).toEqual(products[0]);
    });

    const req = httpMock.expectOne(`${API_URL}/1`);
    expect(req.request.method).toBe("GET");
    req.flush(products[0]);
  });

  it("creates product and reloads list", () => {
    const payload: Product = { id: 3, name: "C", price: 120 };
    httpMock.expectOne(API_URL).flush([]);

    service.createProduct(payload).subscribe((response) => {
      expect(response).toEqual(payload);
    });

    const createReq = httpMock.expectOne(API_URL);
    expect(createReq.request.method).toBe("POST");
    createReq.flush(payload);

    const reloadReq = httpMock.expectOne(API_URL);
    expect(reloadReq.request.method).toBe("GET");
    reloadReq.flush(products);
  });

  it("updates product and reloads list", () => {
    const payload: Product = { id: 1, name: "A+", price: 140 };
    httpMock.expectOne(API_URL).flush([]);

    service.updateProduct(payload).subscribe((response) => {
      expect(response).toEqual(payload);
    });

    const updateReq = httpMock.expectOne(`${API_URL}/1`);
    expect(updateReq.request.method).toBe("PUT");
    updateReq.flush(payload);

    const reloadReq = httpMock.expectOne(API_URL);
    expect(reloadReq.request.method).toBe("GET");
    reloadReq.flush(products);
  });

  it("removes product and reloads list", () => {
    httpMock.expectOne(API_URL).flush([]);

    service.removeProduct(1).subscribe((response) => {
      expect(response).toBeNull();
    });

    const deleteReq = httpMock.expectOne(`${API_URL}/1`);
    expect(deleteReq.request.method).toBe("DELETE");
    deleteReq.flush(null);

    const reloadReq = httpMock.expectOne(API_URL);
    expect(reloadReq.request.method).toBe("GET");
    reloadReq.flush(products);
  });
});
