import prisma from "./prisma";

export interface DashboardStats {
  totalSales: number;
  totalProducts: number;
  totalUsers: number;
  recentSales: number;
  sevenDayRevenue: number;
}

export async function getAdminDashboardStats(): Promise<DashboardStats> {
  try {
    // Get today's date range
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    // Fetch all data in parallel for better performance
    const [sales, products, users] = await Promise.all([
      // Total sales for today
      prisma.sale.aggregate({
        where: {
          createdAt: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        _sum: {
          total: true,
        },
      }),
      // Total products count
      prisma.product.count(),
      // Total users count
      prisma.user.count(),
    ]);

    // Get recent sales count (last 7 days)
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentSales = await prisma.sale.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    // Get 7-day revenue total
    const sevenDayRevenue = await prisma.sale.aggregate({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      _sum: {
        total: true,
      },
    });

    return {
      totalSales: sales._sum.total || 0,
      totalProducts: products,
      totalUsers: users,
      recentSales,
      sevenDayRevenue: sevenDayRevenue._sum.total || 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    // Return default values on error
    return {
      totalSales: 0,
      totalProducts: 0,
      totalUsers: 0,
      recentSales: 0,
      sevenDayRevenue: 0,
    };
  }
}
