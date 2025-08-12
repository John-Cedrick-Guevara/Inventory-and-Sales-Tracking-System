import {
  dailyFilter,
  monthlyFilter,
  Sales,
  weeklyFilter,
} from "@/lib/ChartDataFiltration";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { start } from "repl";
import { object } from "zod/v4";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const period = searchParams.get("period") || "weekly";
    const month = searchParams.get("month") || 8;

    // Final assigned variables
    let startSpanDate: Date;
    let endSpanDate: Date;

    // gets current date
    const dateNow = new Date();

    // sets the value of start and end date depending on period
    switch (period) {
      // sets the start and end date based on user preference(span of days)
      case "daily":
        startSpanDate = new Date(searchParams.get("startDate") as string);
        endSpanDate = new Date(searchParams.get("endDate") as string);
        break;

      // sets the start and end date based on user preference(month)
      case "weekly":
        startSpanDate = new Date(dateNow.getFullYear(), Number(month), 2);
        endSpanDate = new Date(dateNow.getFullYear(), Number(month) + 1, 0);
        break;

      // sets the start and end date for the whole year
      case "monthly":
        startSpanDate = new Date(2025, 1, 1);
        endSpanDate = new Date(2025, 13, 0);
        break;

      // default 1 week span
      default:
        startSpanDate = new Date(
          dateNow.getFullYear(),
          dateNow.getMonth(),
          dateNow.getDate() - 6
        );

        endSpanDate = new Date(
          dateNow.getFullYear(),
          dateNow.getMonth(),
          dateNow.getDate()
        );
    }

    // prisma query
    const sales = await prisma.sale.findMany({
      // filters date
      where: {
        createdAt: {
          gte: startSpanDate,
          lte: endSpanDate,
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

    let groupedSales: Record<
      string,
      {
        revenue: number;
        sales: number;
      }
    > = {};

    // filter based on period
    switch (period) {
      case "daily":
        groupedSales = dailyFilter(sales);
        break;
      case "weekly":
        groupedSales = weeklyFilter(sales);
        break;
      case "monthly":
        groupedSales = monthlyFilter(sales);
        break;

      default:
        groupedSales = weeklyFilter(sales);
    }

    // convertion of record into array for chart
    const chartData = Object.entries(groupedSales).map(([date, data]) => ({
      date,
      revenue: data.revenue,
      sales: data.sales,
    }));
    console.log(`start: ${startSpanDate} \n end : ${endSpanDate}`);

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}
