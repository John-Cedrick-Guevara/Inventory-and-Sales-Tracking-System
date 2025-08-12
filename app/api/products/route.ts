// app/api/products/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch products with related category and sale items
    const products = await prisma.product.findMany({
      include: {
        category: true,
        saleItems: true,
      },
    });

    // Convert images to Base64 Data URLs
    const convertedProducts = products.map((product) => {
      let dataUrl: string | null = null;

      if (product.image) {
        const base64 = Buffer.from(product.image).toString("base64");
        dataUrl = `data:image/png;base64,${base64}`;
      }

      return {
        ...product,
        image: dataUrl,
      };
    });

    return NextResponse.json(convertedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
