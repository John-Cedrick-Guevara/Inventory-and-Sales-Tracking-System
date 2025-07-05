import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// gets token to authenticate user
export async function GET() {
  try {
    // gets token
    const token = (await cookies()).get("token")?.value;

    // sets unauthorized if no token
    if (!token)
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    // else verify token and grant access
    const userData = jwt.verify(token, process.env.JWT_SECRET as string);

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
