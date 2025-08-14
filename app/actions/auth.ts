"use server";

import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";
import { createToken, hashPassword, verifyPassword } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// handles log in function
export async function signInAction(prevState: unknown, formData: FormData) {
  const email = ((formData.get("email") as string) || "").trim().toLowerCase();
  const password = formData.get("password") as string;

  // checks for null value 
  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  // finds the user's existence 
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { success: false, error: "User not found." };
  }
// password verification
  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return { success: false, error: "Invalid credentials." };
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

// handles creation of user(admin control)
export async function signUpAction(prevState: unknown, formData: FormData) {
  const email = ((formData.get("email") as string) || "").trim().toLowerCase();
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  // checks for null value
  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  // checks if email already in use
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "Email already in use." };
  }

  // hash password to be set
  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashed,
    },
  });
  return user;
}

// removes token
export async function signOutAction() {
  (await cookies()).delete("auth_token"); // Remove the auth token cookie
  redirect("/"); // Or whatever your login page is
}

// handles user's change of password
export async function changePassword(prevState: unknown, formData: FormData) {
  const password = formData.get("password") as string;
  const password2 = formData.get("password2") as string;
// gets current user id
  const user = await getCurrentUser();

  // checks for null values
  if (!password || !password2) {
    return { success: false, error: "Please fill out the field" };
  }

  // verify the passwords match
  if (password.trim() !== password2.trim()) {
    console.log("tie");
    return { success: false, error: "Passwords don't match" };
  }

  // hash new password
  const hashed = await hashPassword(password2);

  // database action
  const userNewPass = await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      password: hashed,
    },
  });

  return { success: true, error: "Password changed" };

}
