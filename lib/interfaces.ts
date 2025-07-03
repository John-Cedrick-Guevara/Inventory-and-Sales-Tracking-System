export interface Users {
  id: number;
  name: string;
  email: string;
  role: string;
  sales: number;
  password: string;
}

export interface UserCredentials {
  action: string;
  id?: number;
  role?: string;
  sales?: number;
  email: string;
  password: string;
  name: string;
}

export interface ChangePassword {
  action?: string;
  id: number;
  password: string;
  newPassword: string;
}

export interface Categories {
  id?: number;
  name: string;
}

export interface Product {
  product?: { image: any };

  id?: number;
  name: string;
  description: string;
  price: number;
  stock?: number;
  image?: any;
  createdAt?: string;
  quantity?: number;
  total?: number;
  category?: number | { id: number } | string;
}

export interface Sale {
  createdAt: string;
  id: number;
  userId: number;
  total: number;
  saleItems: {
    product: Product;
    image: string;
    quantity: number;
    subtotal: number;
  }[];
}

export interface SaleItem {
  image: string;
  product: { name: string; image: string; price: number };
  quantity: number;
  sale: { createdAt: string; user: { name: string } };
  subtotal: number;
}
