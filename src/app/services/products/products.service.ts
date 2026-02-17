import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "app/shared/interfaces/product.interface";
import { environment } from "environments/environment";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class ProductsService {
  private readonly API_URL = `${environment.apiUrl}/products`;

  private productsSubject = new BehaviorSubject<Product[]>([]);
  private sortOrderSubject = new BehaviorSubject<"asc" | "desc" | null>(null);

  // order products by price based on sortOrderSubject
  products$ = combineLatest([
    this.productsSubject.asObservable(),
    this.sortOrderSubject.asObservable(),
  ]).pipe(
    map(([products, order]) => {
      if (!order) return products;
      return [...products].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price,
      );
    }),
  );

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<Product[]>(this.API_URL).subscribe({
      next: (products) => this.productsSubject.next(products),
      error: (err) => console.error("Erro ao carregar produtos", err),
    });
  }

  setSortOrder(order: "asc" | "desc") {
    this.sortOrderSubject.next(order);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.API_URL, product)
      .pipe(tap(() => this.loadProducts()));
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.API_URL}/${product.id}`, product)
      .pipe(tap(() => this.loadProducts()));
  }

  removeProduct(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.API_URL}/${id}`)
      .pipe(tap(() => this.loadProducts()));
  }
}

