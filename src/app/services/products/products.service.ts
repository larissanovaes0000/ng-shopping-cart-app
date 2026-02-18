import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "app/shared/interfaces/product.interface";
import { environment } from "environments/environment";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class ProductsService {
  private readonly API_URL = environment.apiUrl ? `${environment.apiUrl}/products` : "";
  private readonly PRODUCTS_STORAGE_KEY = "products";
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private sortOrderSubject = new BehaviorSubject<"asc" | "desc" | null>(null);

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
    if (!this.API_URL) {
      const productsInStorage = this.loadFromStorage();
      if (productsInStorage.length) {
        this.productsSubject.next(productsInStorage);
        return;
      }

      this.http.get<Product[]>("assets/products.json").subscribe({
        next: (products) => {
          this.productsSubject.next(products);
          this.saveToStorage(products);
        },
        error: (err) => console.error("Error loading products", err),
      });
      return;
    }

    this.http.get<Product[]>(this.API_URL).subscribe({
      next: (products) => this.productsSubject.next(products),
      error: (err) => console.error("Error loading products", err),
    });
  }

  setSortOrder(order: "asc" | "desc") {
    this.sortOrderSubject.next(order);
  }

  getProducts(): Observable<Product[]> {
    if (!this.API_URL) {
      return this.productsSubject.asObservable();
    }

    return this.http.get<Product[]>(this.API_URL);
  }

  getProduct(id: number): Observable<Product> {
    if (!this.API_URL) {
      const product = this.productsSubject.value.find((item) => item.id === id);
      return of(product as Product);
    }

    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    if (!this.API_URL) {
      const products = [...this.productsSubject.value];
      const newProduct = {
        ...product,
        id: Date.now(),
      };
      products.push(newProduct);
      this.productsSubject.next(products);
      this.saveToStorage(products);
      return of(newProduct);
    }

    return this.http
      .post<Product>(this.API_URL, product)
      .pipe(tap(() => this.loadProducts()));
  }

  updateProduct(product: Product): Observable<Product> {
    if (!this.API_URL) {
      const products = this.productsSubject.value.map((item) =>
        item.id === product.id ? product : item,
      );
      this.productsSubject.next(products);
      this.saveToStorage(products);
      return of(product);
    }

    return this.http
      .put<Product>(`${this.API_URL}/${product.id}`, product)
      .pipe(tap(() => this.loadProducts()));
  }

  removeProduct(id: number): Observable<void> {
    if (!this.API_URL) {
      const products = this.productsSubject.value.filter((item) => item.id !== id);
      this.productsSubject.next(products);
      this.saveToStorage(products);
      return of(void 0);
    }

    return this.http
      .delete<void>(`${this.API_URL}/${id}`)
      .pipe(tap(() => this.loadProducts()));
  }

  private saveToStorage(products: Product[]): void {
    localStorage.setItem(this.PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }

  private loadFromStorage(): Product[] {
    const value = localStorage.getItem(this.PRODUCTS_STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  }
}

