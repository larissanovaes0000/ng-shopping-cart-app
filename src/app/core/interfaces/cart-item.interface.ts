export interface CartItem {
  id?: number;
  amount: number;
  product: Product;
  subtotal: number;
  quantity?: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  type?: string;
}
