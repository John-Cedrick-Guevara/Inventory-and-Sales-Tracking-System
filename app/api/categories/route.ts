import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // pagination queries
    const page = Number(searchParams.get("page"));
    const pageLimit = Number(searchParams.get("limit"));

    // data to skip
    const skip = (page - 1) * pageLimit;

    const categories = await prisma.category.findMany({
      skip,
      take: pageLimit,
    });

    // total pages
    const totalpage = await prisma.category.count();

    return Response.json(
      {
        data: categories,
        categories: categories,
        totalPage: Math.ceil(totalpage / pageLimit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
