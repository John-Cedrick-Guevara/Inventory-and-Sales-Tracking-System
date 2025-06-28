import { Product } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, total, items } = body;
  console.log(items);

  try {
    const sale = await prisma.sale.create({
      data: {
        userId: userId,
        total: total,
        saleItems: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
    });

    return NextResponse.json({ message: "Sales added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding sales" },
      { status: 500 }
    );
  }
}
