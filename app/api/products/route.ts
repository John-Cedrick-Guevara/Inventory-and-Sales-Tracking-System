// app/api/products/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // pagination queries
    const page = Number(searchParams.get("page"));
    const pageLimit = Number(searchParams.get("limit"));

    const skip = (page - 1) * pageLimit;

    console.log(page);

    // Fetch products with related category and sale items
    const products = await prisma.product.findMany({
      skip,
      take: pageLimit,
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

    const totalpage = await prisma.product.count();

    return NextResponse.json(
      { data: convertedProducts, totalPage: Math.ceil(totalpage / pageLimit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
