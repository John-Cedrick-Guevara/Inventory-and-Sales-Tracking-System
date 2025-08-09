import DashBoardCard from "@/components/DashBoardCard";
import { getAdminDashboardStats } from "@/lib/adminDashboardData";
import { Store, TrendingUp, Package, DollarSign, User, BoxesIcon } from "lucide-react";
import React from "react";

const page = async () => {
  const stats = await getAdminDashboardStats();

  return (
    <main>
      <h1 className="text-3xl font-bold">Today's summary</h1>
      <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
        {/* totals sales revenue*/}
        <DashBoardCard
          title="Total revenue for today"
          value={`$${stats.totalRevenueToday.toLocaleString()}`}
          subtitle="Total sales for the day"
          icon={DollarSign}
        />

        {/* total sales revenue for the last 7 days */}
        <DashBoardCard
          title="Recent 7 days"
          value={`$${stats.sevenDayRevenue.toLocaleString()}`}
          subtitle="Total revenue for the last 7 days"
          icon={DollarSign}
        />

        {/* sales quantity sold for the last 7 days */}
        <DashBoardCard
          title="Quantity sold"
          value={`${stats.totalSalesToday}`}
          subtitle="Total quantity sold for today"
          icon={Package}
        />
        {/* sales quantity sold for the last 7 days */}
        <DashBoardCard
          title="Recent 7 days"
          value={`${stats.recentSales}`}
          subtitle="Total quantity sold for the last 7 days"
          icon={Package}
        />

        {/* total products in inventory */}
        <DashBoardCard
          title="Total Products"
          value={`${stats.totalProducts}`}
          subtitle="Total products in your inventory"
          icon={BoxesIcon}
        />
 
        {/* total staff */}
        <DashBoardCard
          title="Number of Staffs"
          value={`${stats.totalUsers}`}
          subtitle="Total number of staff"
          icon={User}
        />
      </div>
    </main>
  );
};

export default page;
