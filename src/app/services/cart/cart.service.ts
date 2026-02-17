import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { CartItem } from "../../shared/interfaces/cart-item.interface";
import { Product } from "../../shared/interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());

  constructor() {
}

  private get snapshot(): CartItem[] {
    return this.cartSubject.value;
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  setCartItems(items: CartItem[]): void {
    this.cartSubject.next(items);
    this.saveToStorage(items);
  }

  addProduct(product: Product): void {
    const items = [...this.snapshot];
    const index = items.findIndex((i) => i.product.id === product.id);

    if (index > -1) {
      items[index] = {
        ...items[index],
        quantity: items[index].quantity + 1,
      };
    } else {
      items.push({
        product,
        quantity: 1,
        amount: 0,
        subtotal: 0,
      });
    }

    this.setCartItems(items);
  }

  removeProduct(productId: number): void {
    const items = this.snapshot.filter((item) => item.product.id !== productId);
    this.setCartItems(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeProduct(productId);
      return;
    }

    const items = this.snapshot.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item,
    );

    this.setCartItems(items);
  }

  getTotalQuantity(): Observable<number> {
    return this.getCartItems().pipe(
      map((items) => items.reduce((total, item) => total + item.quantity, 0)),
    );
  }

  getTotalAmount(): Observable<number> {
    return this.getCartItems().pipe(
      map((items) =>
        items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        ),
      ),
    );
  }

  clearCart(): void {
    localStorage.removeItem("app_cart");
    this.cartSubject.next([]);
  }

  private saveToStorage(items: CartItem[]): void {
    localStorage.setItem("app_cart", JSON.stringify(items));
  }

  loadFromStorage(): CartItem[] {
    const data = localStorage.getItem("app_cart");
    return data ? JSON.parse(data) : [];
  }

  // clean storage on logout
  logout(): void {
    localStorage.removeItem("app_cart");
    this.cartSubject.next([]);
  }
}

