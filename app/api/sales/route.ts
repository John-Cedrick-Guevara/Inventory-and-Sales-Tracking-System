import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Sales

// handles creation of sale
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, total, items } = body;

  try {
    const sale = await prisma.sale.create({
      data: {
        userId: userId,
        total: total,
        // add the items to saleItems table
        saleItems: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            subtotal: item.subtotal,
          })),
        },
      },
    });

    // updates the stock in product table
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
  const { searchParams } = new URL(req.url);
  
  // user id to reference
  const userId = req.nextUrl.searchParams.get("userId");
  
  // pagination essentials
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const skip = (page - 1) * pageSize;

  try {
    const [data, total] = await Promise.all([
      prisma.sale.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },

        where: {
          userId: Number(userId),
        },
        // includes saleItems product, quntity and subtotal
        include: {
          saleItems: {
            select: {
              product: true,
              quantity: true,
              subtotal: true,
            },
          },
        },
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
    return NextResponse.json(
      { message: "Error fetching sale history" },
      { status: 500 }
    );
  }
}
