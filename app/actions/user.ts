"use server"
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";

export async function updateUser(prevState: unknown, formData: FormData) {
  const email = ((formData.get("email") as string) || "").trim().toLowerCase();
  let password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const id = Number(formData.get("id"));

  if (!id) throw new Error("Id is required.");

  const data: any = {};

  if (email && email.trim() !== "") {
    data.email = email.trim();
  }

  if (name && name.trim() !== "") {
    data.name = name.trim();
  }

  if (password && password !== "") {
    data.password = await hashPassword(password);
  }

  if (Object.keys(data).length === 0) {
    // nothing to update
    return null;
  }

  console.log(password);

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });

  return updatedUser;
}
