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
  product: { name: string; image: string; price: number };
  productId: number;
  quantity: number;
  sale: { createdAt: string; id: number };
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

// export interface GetUser {
//   data: UserCredentials[];
//   currentPage: number;
//   pageSize: number;
//   totalItems: number;
//   totalPages: number;
// }
// export interface GetProduct {
//   data: Product[];
//   currentPage: number;
//   pageSize: number;
//   totalItems: number;
//   totalPages: number;
// }
// export interface GetSales {
//   data: Sale[];
//   currentPage: number;
//   pageSize: number;
//   totalItems: number;
//   totalPages: number;
// }
// export interface GetSaleItems {
//   data: SaleItem[];
//   currentPage: number;
//   pageSize: number;
//   totalItems: number;
//   totalPages: number;
// }

// export interface UserCredentials {
//   action: string;
//   id?: number;
//   role?: string;
//   sales?: number;
//   email: string;
//   password: string;
//   name: string;
// }

// export interface ChangePassword {
//   action?: string;
//   id: number;
//   password: string;
//   newPassword: string;
// }
