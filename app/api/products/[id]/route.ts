import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const deletedProduct = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
