import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "week";

    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;
    let dataPoints: number;

    switch (period) {
      case "day":
        // Show last 30 days
        dataPoints = 30;
        startDate = new Date(
          now.getTime() - (dataPoints - 1) * 24 * 60 * 60 * 1000
        );
        break;
      case "week":
        // Show last 12 weeks
        dataPoints = 12;
        startDate = new Date(
          now.getTime() - (dataPoints - 1) * 7 * 24 * 60 * 60 * 1000
        );
        break;
      case "month":
        // Show last 12 months
        dataPoints = 12;
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - (dataPoints - 1),
          1
        );
        break;
      default:
        dataPoints = 7;
        startDate = new Date(
          now.getTime() - (dataPoints - 1) * 24 * 60 * 60 * 1000
        );
    }

    const sales = await prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        total: true,
        createdAt: true,
        saleItems: {
          select: {
            quantity: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Group sales by period
    const groupedSales = new Map<string, { revenue: number; sales: number }>();

    sales.forEach((sale) => {
      let key: string;

      switch (period) {
        case "day":
          // Group by day (YYYY-MM-DD)
          key = sale.createdAt.toISOString().split("T")[0];
          break;
        case "week":
          // Group by week (YYYY-WW format)
          const weekStart = new Date(sale.createdAt);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          const weekNumber = Math.ceil(
            (weekStart.getTime() -
              new Date(weekStart.getFullYear(), 0, 1).getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          );
          key = `${weekStart.getFullYear()}-W${weekNumber
            .toString()
            .padStart(2, "0")}`;
          break;
        case "month":
          // Group by month (YYYY-MM format)
          key = `${sale.createdAt.getFullYear()}-${String(
            sale.createdAt.getMonth() + 1
          ).padStart(2, "0")}`;
          break;
        default:
          key = sale.createdAt.toISOString().split("T")[0];
      }

      const existing = groupedSales.get(key) || { revenue: 0, sales: 0 };
      existing.revenue += sale.total;
      existing.sales += sale.saleItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      groupedSales.set(key, existing);
    });

    // Fill in missing periods with zero values
    const chartData = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < dataPoints; i++) {
      let key: string;
      let label: string;

      switch (period) {
        case "day":
          key = currentDate.toISOString().split("T")[0];
          label = currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case "week":
          const weekStart = new Date(currentDate);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          const weekNumber = Math.ceil(
            (weekStart.getTime() -
              new Date(weekStart.getFullYear(), 0, 1).getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          );
          key = `${weekStart.getFullYear()}-W${weekNumber
            .toString()
            .padStart(2, "0")}`;
          label = `Week ${weekNumber}`;
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case "month":
          key = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
          ).padStart(2, "0")}`;
          label = currentDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        default:
          key = currentDate.toISOString().split("T")[0];
          label = currentDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          currentDate.setDate(currentDate.getDate() + 1);
      }

      const data = groupedSales.get(key) || { revenue: 0, sales: 0 };
      chartData.push({
        date: key,
        label: label,
        revenue: Math.round(data.revenue * 100) / 100,
        sales: data.sales,
      });
    }

    console.log("API Response - Period:", period, "Data:", chartData);

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    return NextResponse.json(
      { error: "Failed to fetch revenue data" },
      { status: 500 }
    );
  }
}
