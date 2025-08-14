"use client";
import React, { Dispatch, useEffect, useState } from "react";
import RevenueChart from "./RevenueChart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import DatePicker from "@/components/DatePicker";
import { defaultEndDate, defaultStartDate } from "@/lib/constants";
import DashBoardCard from "@/components/DashBoardCard";
import { DollarSign, Package, BoxesIcon, User } from "lucide-react";
import { DashboardStats } from "@/lib/adminDashboardData";
import { Skeleton } from "@/components/ui/skeleton";
import ProductChart from "@/components/ProductChart";
import TopProductsTable from "@/components/TopProductsTable";
import LowStockTable from "@/components/LowStockTable";
import ChartHeading from "@/components/ChartHeading";
import PeriodDropDown from "@/components/SelectPeriod";

interface RevenueData {
  date: string;
  revenue: number;
  sales: number;
}

const ChartContainer = ({ stats }: { stats: DashboardStats }) => {
  // chart data
  const [data, setData] = useState<RevenueData[]>([]);

  // period(time span)
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  // selected month(for weekly data)
  const [month, setMonth] = useState("7");

  // loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // popover triggers
  const [openStartDate, setOpenStartDate] = React.useState(false);
  const [openEndDate, setOpenEndDate] = React.useState(false);

  // start and end dates for span
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    defaultStartDate
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    defaultEndDate
  );

  // fetcher
  const getData = async (selectedPeriod: "daily" | "weekly" | "monthly") => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get<RevenueData[]>(
        `/api/stats?period=${selectedPeriod}&startDate=${startDate}&endDate=${endDate}&month=${month}`
      );

      setData(res.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // calls fetcher
  useEffect(() => {
    getData(period);
  }, [period, endDate, startDate, month]);

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Revenue Chart
          </h3>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => getData(period)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100vh] grid grid-cols-3 gap-4">
      <h1 className="text-3xl font-bold">Today's summary</h1>

      {/* summary cards */}
      <div className="col-span-3">
        <DashBoardCards stats={stats} />
      </div>

      {/* revenue chart */}
      <div className="card col-span-3">
        <div className="flex items-end justify-end gap-2 max-md:flex-wrap">
          {/* heading */}
          <ChartHeading>Revenue:</ChartHeading>

          {/* filter bar */}
          {period === "daily" ? (
            // date picker(for daily chart)
            <DatePicker
              openStartDate={openStartDate}
              setOpenStartDate={setOpenStartDate}
              startDate={startDate}
              setStartDate={setStartDate}
              openEndDate={openEndDate}
              setOpenEndDate={setOpenEndDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          ) : (
            // month picker(for weekly chart)
            period === "weekly" && (
              <MonthDropdown month={month} setMonth={setMonth} />
            )
          )}

          {/* day, week, month */}
          <PeriodDropDown period={period} setPeriod={setPeriod} />
        </div>

        {data.length === 0 && !loading ? (
          // fall back
          <div className="text-center py-12">
            <p className="text-gray-500">
              No revenue data available for the selected period.
            </p>
          </div>
        ) : loading ? (
          // loading state
          <Skeleton className="h-64 bg-gray-200 rounded  mt-8"></Skeleton>
        ) : (
          // revenue chart
          <div className="mt-8  overflow-x-auto ">
            <RevenueChart dataChart={data} />
          </div>
        )}
      </div>

      {/* product chart */}
      <div className="card h-90">
        <ProductChart dataChart={stats.productStats} />
      </div>

      {/* top products */}
      <div className="card">
        <TopProductsTable stats={stats} />
      </div>
      {/* Low stock products */}
      <div className="card">
        <LowStockTable stats={stats} />
      </div>
    </div>
  );
};

export default ChartContainer;

export function DashBoardCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  gap-4 mt-10 place-items-center">
      {/* total sales revenue for the last 7 days */}
      <DashBoardCard
        title="Recent 7 days"
        value={`$${stats.sevenDayRevenue.toLocaleString()}`}
        subtitle="Total revenue for the last 7 days"
        icon={DollarSign}
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
  );
}

export function MonthDropdown({
  month,
  setMonth,
}: {
  month: string;
  setMonth: Dispatch<React.SetStateAction<string>>;
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Select value={month} onValueChange={(item: any) => setMonth(item)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent>
        {months.map((month, index) => (
          <SelectItem
            key={index}
            value={index.toString()} // month number as value
          >
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

