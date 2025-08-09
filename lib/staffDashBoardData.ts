import { getCurrentUser } from "./getCurrentUser";
import prisma from "./prisma";

export interface StaffDashboardStats {
  todaysRevenue: number;
  todaysSales: number;
  sevenDayRevenue: number;
  sevenDaySales: number;
  
}

export async function getStaffDashboardStats(): Promise<StaffDashboardStats> {
  try {
    const user = await getCurrentUser();
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    // gets staff's sales and revenue for today
    const todaysRevenue = await prisma.sale.aggregate({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
        user: {
          id: user?.id,
        },
      },
      _sum: {
        total: true,
      },
    });

    // gets staff sales for today
    const todaysSales = await prisma.sale.count({
      where: {
        userId: user?.id,
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    // Get recent sales count (last 7 days) of staff
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentSales = await prisma.sale.count({
      where: {
        userId: user?.id,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    // Get 7-day revenue total of staff
    const sevenDayRevenue = await prisma.sale.aggregate({
      where: {
        userId: user?.id,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      _sum: {
        total: true,
      },
    });

    return {
      todaysRevenue: todaysRevenue._sum.total || 0,
      todaysSales: todaysSales,
      sevenDayRevenue: sevenDayRevenue._sum.total || 0,
      sevenDaySales: recentSales,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      todaysRevenue: 0,
      todaysSales: 0,
      sevenDayRevenue: 0,
      sevenDaySales: 0,
    };
  }
}
