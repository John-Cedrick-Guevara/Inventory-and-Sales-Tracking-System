"use server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { action, email, name, password } = body;

  if (!action)
    return NextResponse.json(
      { message: "No specific action" },
      { status: 501 }
    );

  if (action === "signUp") {
    const encryptedPass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: encryptedPass,
        name: name,
      },
    });
    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } else if (action === "logIn") {
    const user = await prisma.user.findUnique({ where: { email } });
    // checks if user exists
    if (!user)
      return NextResponse.json(
        { message: "No user with such email." },
        { status: 404 }
      );
    //checking of password
    if (!(await bcrypt.compare(password, user.password)))
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 401 }
      );

    // token generation
    const token = jwt.sign(
      {
        userData: {
          email: user.email,
          name: user.name,
          role: user.role,
          id: user.id,
        },
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    // stores token in https only
    const cookieStore = await cookies();
    cookieStore.set("token", token, { httpOnly: true });

    return NextResponse.json({ role: user.role }, { status: 201 });
  }
}

export async function GET() {
  try {
    const data = await prisma.user.findMany();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
