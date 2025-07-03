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

    for (const item of items) {
      await prisma.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return NextResponse.json({ message: "Sales added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding sales" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  console.log(userId);
  try {
    const sale = await prisma.sale.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        
        saleItems: {
          select: {
            product: true,
            quantity: true,
            subtotal: true,
            
          },
        },
      },
    });

    return NextResponse.json(sale, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching sale history" },
      { status: 500 }
    );
  }
}
