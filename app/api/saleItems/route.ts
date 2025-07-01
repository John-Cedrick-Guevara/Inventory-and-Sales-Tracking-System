import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const saleItems = await prisma.saleItem.findMany({
      include: {
        product: {
          select: {
            name: true,
          },
        },
        sale: {
          select: {
            createdAt: true,
          },
        },
      },
    });

    return NextResponse.json(saleItems, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching sale items" },
      { status: 500 }
    );
  }
}
