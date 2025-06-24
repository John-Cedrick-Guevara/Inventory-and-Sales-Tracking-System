
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
  action? : string 
  id: number 
  password: string
  newPassword: string
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
  stock?: number; 
  image?: any ;
  category?:  string | {id: string};
  createdAt?: string;
}

