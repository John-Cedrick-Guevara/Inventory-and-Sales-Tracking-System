import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    (await cookies()).set("token", "", { httpOnly: true, maxAge: 0 });
    return NextResponse.json(
      { message: "JWT token deleted succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting jwt token" },
      { status: 500 }
    );
  }
}
