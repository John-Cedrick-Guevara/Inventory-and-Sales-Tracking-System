import { string, z } from "zod/v4";

export const signUpSchema = z.object({
  action: string(),
  email: string().nonempty(),
  password: string().nonempty().min(6, "Minimum password length is 6. "),
  name: string().nonempty(),
});
