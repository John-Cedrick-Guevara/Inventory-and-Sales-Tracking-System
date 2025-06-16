export interface Users {
  userId: number
  name: string
  email: string
  role: string
  sales: number
}

export interface UserCredentials {
  action: string;
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
