import { number, string, z } from "zod/v4";

export const UserCredentialsSchema = z.object({
  action: string().nonempty(),
  id: number().optional(),
  email: string()
    .nonempty("Email is required")
    .min(1, "Please enter a valid email"),
  password: string()
    .nonempty("Password is required")
    .min(6, "Minimum password length is 6. "),
  name: string().nonempty("Name is required"),
});

export const signUpSchema = z.object({
  action: string().optional(),
  email: string()
    .nonempty("Email field is required")
    .min(1, "Please enter a valid email"),
  password: string()
    .nonempty("Password field is required")
    .min(1, "Password should be longer than 3 characters"),
});

export const CategoriesSchema = z.object({
  id: number().optional(),
  name: string()
    .min(1, "Please enter a valid name")
    .nonempty("Name field is required"),
});

export const ProductSchema = z.object({
  id: number().optional(),
  name: string()
    .min(1, "Please enter a valid name")
    .nonempty("Name field is required"),
  description: string()
    .min(1, "Please enter a valid name")
    .nonempty("Description field is required"),
  price: string().or(z.number()),
  stock: string().or(z.number()),
  image: string().or(z.object()).optional(),
  category: number().or(z.string()),
});

export const ChangePasswordSchema = z.object({
  action: string().nonempty(),
  id: number().optional(),
  password: string()
    .min(1, "Please enter your password")
    .nonempty("Please input your current password"),
  newPassword: string()
    .min(1, "Please enter your password")
    .nonempty("Please input your new password"),
});
