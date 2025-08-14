import { RevenueData } from "./interfaces";
import prisma from "./prisma";

export interface ProductQuantityData {
  name: string;
  quantity: number;
  subTotal: number;
}

export interface LowStockProduct {
  name: string;
  stock: number;
}

export interface DashboardStats {
  totalSalesToday: number;
  totalProducts: number;
  totalUsers: number;
  recentSales: number;
  sevenDayRevenue: number;
  totalRevenueToday: number;
  productStats: RevenueData[];
  topToday: ProductQuantityData[];
  topWeek: ProductQuantityData[];
  topMonth: ProductQuantityData[];
  lowStock: LowStockProduct[];
}

export async function getAdminDashboardStats(): Promise<DashboardStats> {
  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      sales,
      products,
      users,
      saleItem,
      recentSales,
      sevenDayRevenue,
      topToday,
      topWeek,
      topMonth,
      lowStock,
    ] = await Promise.all([
      // sum of revenues today
      prisma.sale.aggregate({
        where: { createdAt: { gte: startOfDay, lt: endOfDay } },
        _sum: { total: true },
      }),

      // fetches products
      prisma.product.findMany({
        select: {
          name: true,
          saleItems: { select: { subtotal: true, quantity: true } },
        },
      }),

      // user count
      prisma.user.count({ where: { role: "STAFF" } }),

      // sale count for today
      prisma.saleitem.count({
        where: { sale: { createdAt: { gte: startOfDay, lt: endOfDay } } },
      }),

      // sale count for the week
      prisma.saleitem.count({
        where: { sale: { createdAt: { gte: sevenDaysAgo } } },
      }),

      // total revenue for the week
      prisma.sale.aggregate({
        where: { createdAt: { gte: sevenDaysAgo } },
        _sum: { total: true },
      }),

      // top 5 products of the day
      prisma.product.findMany({
        where: {
          saleItems: {
            some: { sale: { createdAt: { gte: startOfDay, lt: endOfDay } } },
          },
        },
        select: {
          name: true,
          saleItems: { select: { quantity: true, subtotal: true } },
        },
        orderBy: { saleItems: { _count: "desc" } },
        take: 5,
      }),

      // top 5 products of the week
      prisma.product.findMany({
        where: {
          saleItems: { some: { sale: { createdAt: { gte: sevenDaysAgo } } } },
        },
        select: {
          name: true,
          saleItems: { select: { quantity: true, subtotal: true  } },
        },
        orderBy: { saleItems: { _count: "desc" } },
        take: 5,
      }),

      // top 5 products of the month
      prisma.product.findMany({
        where: {
          saleItems: { some: { sale: { createdAt: { gte: monthAgo } } } },
        },
        select: {
          name: true,
          saleItems: { select: { quantity: true , subtotal: true } },
        },
        orderBy: { saleItems: { _count: "desc" } },
        take: 5,
      }),

      // low stock items
      prisma.product.findMany({
        where: { stock: { lt: 5 } },
        select: { name: true, stock: true },
        orderBy: { stock: "asc" },
      }),
    ]);

    const productStats: RevenueData[] = products.map((item) => {
      const revenue = item.saleItems.reduce((sum, s) => sum + s.subtotal, 0);
      const sales = item.saleItems.reduce((sum, s) => sum + s.quantity, 0);
      return { name: item.name, revenue, sales };
    });

    return {
      totalRevenueToday: sales._sum.total || 0,
      totalSalesToday: saleItem,
      totalProducts: products.length,
      totalUsers: users,
      recentSales,
      sevenDayRevenue: sevenDayRevenue._sum.total || 0,
      productStats,
      topToday: topToday.map((p) => ({
        name: p.name,
        quantity: p.saleItems.reduce((sum, s) => sum + s.quantity, 0),
        subTotal: p.saleItems.reduce((sum, s) => sum + s.subtotal, 0),
      })),
      topWeek: topWeek.map((p) => ({
        name: p.name,
        quantity: p.saleItems.reduce((sum, s) => sum + s.quantity, 0),
        subTotal: p.saleItems.reduce((sum, s) => sum + s.subtotal, 0),
      })),
      topMonth: topMonth.map((p) => ({
        name: p.name,
        quantity: p.saleItems.reduce((sum, s) => sum + s.quantity, 0),
        subTotal: p.saleItems.reduce((sum, s) => sum + s.subtotal, 0),
      })),
      lowStock,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      productStats: [],
      totalRevenueToday: 0,
      totalSalesToday: 0,
      totalProducts: 0,
      totalUsers: 0,
      recentSales: 0,
      sevenDayRevenue: 0,
      topToday: [],
      topWeek: [],
      topMonth: [],
      lowStock: [],
    };
  }
}
