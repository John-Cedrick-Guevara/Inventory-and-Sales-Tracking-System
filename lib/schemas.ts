import { number, string, z } from "zod/v4";

export const UserCredentialsSchema = z.object({
  action: string().optional(),
  id: number().optional(),
  email: string().nonempty(),
  password: string().nonempty().min(6, "Minimum password length is 6. "),
  name: string().nonempty(),
});

export const CathegoriesSchema = z.object({
  id: number().optional(),
  name: string().min(1, "Please enter a valid name").nonempty(),
});
