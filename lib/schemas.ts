import { number, string, z } from "zod/v4";

export const UserCredentialsSchema = z.object({
  action: string().optional(),
  id: number().optional(),
  email: string().nonempty(),
  password: string().nonempty().min(6, "Minimum password length is 6. "),
  name: string().nonempty(),
});
