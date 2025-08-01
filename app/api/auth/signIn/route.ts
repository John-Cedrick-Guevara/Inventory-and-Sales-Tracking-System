import prisma from "@/lib/prisma";
import { createToken, verifyPassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // checks if credentials has been passed
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password required" },
      { status: 401 }
    );
  }

  // checks for existing user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createToken({ userId: user.id });

  // set cookie
  const cookie = serialize("auth_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60, // 1 hour
    sameSite: "lax", // adjust as needed
    secure: process.env.NODE_ENV === "production",
  });

  const res = NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
  res.headers.set("Set-Cookie", cookie);
  return res;
}
