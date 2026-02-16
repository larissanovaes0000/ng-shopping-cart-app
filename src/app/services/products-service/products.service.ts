import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "app/core/interfaces/product.interface";
import { Observable } from "rxjs";

@Injectable()
export class ProductsService {
  private readonly BASE_URL = "http://localhost/api/";
  private readonly PRODUCTS_URL = `${this.BASE_URL}products/`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCTS_URL);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.PRODUCTS_URL}${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.PRODUCTS_URL, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.PRODUCTS_URL}${product.id}`, product);
  }

  removeProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.PRODUCTS_URL}${id}`);
  }
}
