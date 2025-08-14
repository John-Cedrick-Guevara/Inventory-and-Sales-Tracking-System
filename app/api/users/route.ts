import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // pagination queries
    const page = Number(searchParams.get("page"));
    const pageLimit = Number(searchParams.get("limit"));

    // data to skip
    const skip = (page - 1) * pageLimit;

    const staff = await prisma.user.findMany({
      skip,
      take: pageLimit,
      where: { role: "STAFF" },
      include: {
        sales: {
          select: {
            saleItems: true,
          },
        },
      },
    });

    // total pages of staffs data
    const totalpage = await prisma.user.count({
      where: {
        role: "STAFF",
      },
    });

    return NextResponse.json(
      { data: staff, totalPage: Math.ceil(totalpage / pageLimit) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch staff" },
      { status: 500 }
    );
  }
}
