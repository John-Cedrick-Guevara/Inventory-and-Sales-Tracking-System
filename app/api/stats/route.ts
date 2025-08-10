import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { start } from "repl";
import { object } from "zod/v4";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const period = searchParams.get("period") || "week";
    // Raw params
    const rawStartDate = searchParams.get("startDate");
    const rawEndDate = searchParams.get("endDate");

    // Defaults
    const defaultStartDate = new Date();
    const defaultEndDate = (() => {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      return d;
    })();

    // Final assigned variables
    const startSpanDate =
      rawStartDate === null ? defaultStartDate : new Date(rawStartDate);
    const endSpanDate =
      rawEndDate === null ? defaultEndDate : new Date(rawEndDate);

    // const date now
    const now = new Date();
    const nowEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 6
    );
    // console.log(startDateDefault);

    // switch (period) {
    //   case "day":
    //     startDate = new Date(
    //       dateNow.getFullYear(),
    //       dateNow.getMonth(),
    //       dateNow.getDate()
    //     );
    //     break;

    //   case "week":
    //     const todayOfWeek = dateNow.getDay();
    //     const daysToSubtract = todayOfWeek === 0 ? 6 : todayOfWeek - 1;
    //     startDate = new Date(
    //       dateNow.getFullYear(),
    //       dateNow.getMonth(),
    //       dateNow.getDate() - daysToSubtract
    //     );
    //     break;

    //   case "month":
    //     startDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
    //     break;
    //   default:
    //     startDate = new Date(
    //       dateNow.getFullYear(),
    //       dateNow.getMonth(),
    //       dateNow.getDate() - 6
    //     );
    // }

    // prisma query

    const sales = await prisma.sale.findMany({
      // filters date
      where: {
        createdAt: {
          gte: startSpanDate === undefined ? defaultStartDate : startSpanDate,
          lte: endSpanDate === undefined ? defaultEndDate : endSpanDate,
        },
      },

      // selects necessary data
      select: {
        total: true,
        createdAt: true,
        saleItems: {
          select: {
            quantity: true,
          },
        },
      },

      // ascending order
      orderBy: {
        createdAt: "asc",
      },
    });

    const groupedSales = sales.reduce((acc, sale) => {
      const dateKey = sale.createdAt.toISOString().split("T")[0];

      if (!acc[dateKey]) {
        acc[dateKey] = { revenue: 0, sales: 0 };
      }

      acc[dateKey].revenue += sale.total;
      acc[dateKey].sales += sale.saleItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      return acc;
    }, {} as Record<string, { revenue: number; sales: number }>);

    const chartData = Object.entries(groupedSales).map(([date, data]) => ({
      date,
      revenue: data.revenue,
      sales: data.sales,
    }));

    // console.log("chart data", chartData);

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}
