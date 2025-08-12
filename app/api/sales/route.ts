import { getCurrentUser } from "@/lib/getCurrentUser";
import { AddSaleQueItem } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await getCurrentUser()
  console.log(user);
  const { userId, total, saleItems } = body;

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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // start and end date
    const startSpanDate = new Date(searchParams.get("startSpanDate") as string);
    const endSpanDate = new Date(searchParams.get("endSpanDate") as string);

    // data query
    const saleHistory = await prisma.saleItem.findMany({
      where: {
        sale: {
          createdAt: {
            gte: startSpanDate,
            lte: endSpanDate,
          },
        },
      },
      include: {
        product: {
          select: {
            name: true,
            price: true,
            category: true,
          },
        },
        sale: {
          select: {
            createdAt: true,
            id: true,

            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(saleHistory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}
