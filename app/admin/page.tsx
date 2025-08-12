import DashBoardCard from "@/components/DashBoardCard";
import { getAdminDashboardStats } from "@/lib/adminDashboardData";
import prisma from "@/lib/prisma";
import {
  Store,
  TrendingUp,
  Package,
  DollarSign,
  User,
  BoxesIcon,
} from "lucide-react";
import React from "react";
import ChartContainer from "./ChartContainer";

const page = async () => {
  const stats = await getAdminDashboardStats();

  return (
    <>
      <div>
        <ChartContainer stats={stats} />
      </div>
    </>
  );
};

export default page;
