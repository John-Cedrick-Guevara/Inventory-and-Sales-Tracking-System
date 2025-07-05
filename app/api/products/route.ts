import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Products

// handles creation of new product
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // pagination essentials
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const skip = (page - 1) * pageSize;

  try {
    const [data, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: {
          category: true,
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
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

// handles creation of new products
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, description, stock, price, image, category } = body;

  try {
    const productAdded = await prisma.product.create({
      data: {
        name: name,
        description: description,
        price: Number(price),
        stock: Number(stock),
        image: image,
        // reference to the category table
        category: {
          connect: { id: Number(category) },
        },
      },
    });

    return NextResponse.json({ message: "Product uploaded" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error uploading product" },
      { status: 500 }
    );
  }
}

// handles data edit of product
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, name, description, stock, price, image, category } = body;
  try {
    const productEdited = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        price: Number(price),
        stock: Number(stock),
        image: image,
        // reference to category table
        category: {
          connect: { id: Number(category) },
        },
      },
    });

    return NextResponse.json({ message: "Product Edited" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error editing product" },
      { status: 500 }
    );
  }
}

// handles deletion of data
export async function DELETE(req: NextRequest) {
  const id = await req.json();

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Product Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json("failed to delete cathegory", { status: 500 });
  }
}
