import { AddSaleQueItem } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { Playwrite_BE_VLG } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, total, saleItems } = body;

  console.log(body);

  try {
    // adds the sale to the database
    const newSale = await prisma.sale.create({
      data: {
        userId,
        total,
        saleItems: {
          create: saleItems.map((item: AddSaleQueItem) => ({
            productId: item.id,
            quantity: item.quantity,
            subtotal: item.subTotal,
          })),
        },
      },
    });

    // updates the stock of sold items
    for (const item of saleItems) {
      await prisma.product.update({
        where: {
          id: item.id,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return NextResponse.json({ message: "Sales added" }, { status: 200 });
  } catch (error) {
    console.error("Sale creation failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
