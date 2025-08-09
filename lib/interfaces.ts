import { CategoricalChartFunc } from "recharts/types/chart/types";

export interface Users {
  id: number;
  name: string;
  email: string;
  role: string;
  sales: number;
  password: string;
}

export interface Categories {
  id?: number;
  name: string;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: any;
  createdAt: string;
  quantity: number;
  total: number;
  category?: Categories;
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
  id: number;
  product: { name: string; price: number };
  productId: number;
  quantity: number;
  sale: { createdAt: string; id: number; user: { name: string } };
  saleId: number;
  subtotal: number;
}

export interface AddSaleQueItem {
  id: number | unknown;
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
  image: any;
  category?: Categories;
}
