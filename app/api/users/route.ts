"use server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { date } from "zod/v4";

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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const skip = (page - 1) * pageSize;


  try {
    const [data, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json({
      data,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize),
      pageSize,
      totalItems: total,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { email, name, password, id, action, newPassword } = body;
  console.log(body);
  try {
    if (!action)
      return NextResponse.json({ message: "No action" }, { status: 500 });

    if (action === "editCredentials") {
      const newEncryptedPass = await bcrypt.hash(password, 10);

      const data = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          password: newEncryptedPass,
          email: email,
        },
      });
    } else if (action === "editPass") {
      const newEncryptedPass = await bcrypt.hash(newPassword, 10);

      const data = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          password: newEncryptedPass,
        },
      });
    }
    return NextResponse.json(
      { message: "User credentials edited" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();

  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: data,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
