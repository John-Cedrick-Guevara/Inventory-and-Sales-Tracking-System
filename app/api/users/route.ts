"use server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, email, name, password } = body.data;

  if (!action)
    return NextResponse.json(
      { message: "No specific action" },
      { status: 501 }
    );

  if (action === "signUp") {
    const encryptedPass = await bcrypt.hash(password, 10);
    const data = await prisma.user.create({
      data: {
        email: email,
        password: encryptedPass,
        name: name,
      },
    });
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  }
}
