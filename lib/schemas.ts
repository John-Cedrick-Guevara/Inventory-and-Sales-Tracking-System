import { number, string, z } from "zod/v4";

export const UserCredentialsSchema = z.object({
  action: string().optional(),
  id: number().optional(),
  email: string().nonempty(),
  password: string().nonempty().min(6, "Minimum password length is 6. "),
  name: string().nonempty(),
});

export const CategoriesSchema = z.object({
  id: number().optional(),
  name: string().min(1, "Please enter a valid name").nonempty(),
});

export const ProductSchema = z.object({
  id: number().optional(),
  name: string().min(1, "Please enter a valid name").nonempty(),
  description: string().min(1, "Please enter a valid name").nonempty(),
  price: string().or(z.number()),
  stock: string().or(z.number()),
  image: string(),
  category: string().nonempty(),
});
