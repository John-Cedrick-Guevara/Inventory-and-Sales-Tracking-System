export interface Users {
  id: number;
  name: string;
  email: string;
  role: string;
  sales: number;
  password:string
}

export interface UserCredentials {
  action: string;
  id?: number;
  email: string;
  password: string;
  name: string;
}

export interface editUserCredentials {
  id: number;
  email: string;
  password: string;
  name: string;
}
