import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Sale items

// Handles query of sale items
export async function GET() {
  try {
    const saleItems = await prisma.saleItem.findMany({
      include: {
        // includes product name, image and price
        product: {
          select: {
            name: true,
            image: true,
            price:true
          },
        },
        sale: {
           // includes staff name
          select: {
            user: {
              select: {
                name: true,
              },
            },
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
