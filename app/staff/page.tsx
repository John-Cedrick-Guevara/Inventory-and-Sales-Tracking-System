import DashBoardCard from "@/components/DashBoardCard";
import { getStaffDashboardStats } from "@/lib/staffDashBoardData";
import { Store, Package, Users, TrendingUp } from "lucide-react";
import React from "react";

const page = async () => {
  const stats = await getStaffDashboardStats();

  return (
    <main>
      <h1 className="text-3xl font-bold">Today's summary</h1>
      <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
        {/* quantity sold for the day */}
        <DashBoardCard
          title="Today's Quantity Sold"
          value={`${stats.todaysSales}`}
          subtitle="Total sales for the day"
          icon={Store}
        />

        {/* quantity sold for the last 7 days */}
        <DashBoardCard
          title="Recent Quantity Sold"
          value={`${stats.sevenDaySales}`}
          subtitle="Sales in last 7 days"
          icon={TrendingUp}
        />
        
        {/* sales cost sold for the day */}
        <DashBoardCard
          title="Today's Total Sales"
          value={`$${stats.todaysRevenue.toLocaleString()}`}
          subtitle="Total sales for the day"
          icon={Package}
        />

        {/* sales cost sold for the last 7 days */}
        <DashBoardCard
          title="Recent 7 days"
          value={`$${stats.sevenDayRevenue.toLocaleString()}`}
          subtitle="Total revenue for the last 7 days"
          icon={TrendingUp}
        />
      </div>
    </main>
  );
};

export default page;
