"use server";

import prisma from "@/lib/prisma";
import { createToken, verifyPassword } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(prevState: unknown, formData: FormData) {
  const email = ((formData.get("email") as string) || "").trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials.");
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials.");
  }

  const token = createToken({ userId: user.id }); // ensure this signs with secret + expiry

  // Set HttpOnly cookie via Next.js helper
  (
    await // Set HttpOnly cookie via Next.js helper
    cookies()
  ).set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60, // 1 hour
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect(`/${user.role.toLocaleLowerCase()}`);

  return { token, role: user?.role, name: user?.name, id: user?.id };
}
