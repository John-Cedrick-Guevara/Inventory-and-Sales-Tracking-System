import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const userData = jwt.verify(token, process.env.JWT_SECRET as string);

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
