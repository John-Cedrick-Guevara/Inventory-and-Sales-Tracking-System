"use client";
import React, { useEffect, useState } from "react";
import RevenueChart from "./RevenueChart";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

interface RevenueData {
  date: string;
  revenue: number;
  sales: number;
}

const ChartContainer = () => {
  const defaultEndDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  })();

  const [data, setData] = useState<RevenueData[]>([]);
  const [period, setPeriod] = useState<"day" | "week" | "month">("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openStartDate, setOpenStartDate] = React.useState(false);
  const [openEndDate, setOpenEndDate] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    defaultEndDate
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());

  const getData = async (selectedPeriod: "day" | "week" | "month") => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get<RevenueData[]>(
        `/api/stats?period=${selectedPeriod}&startDate=${startDate}&endDate=${endDate}`
      );

      setData(res.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePeriodChange = (newPeriod: "day" | "week" | "month") => {
    setPeriod(newPeriod);
  };

  useEffect(() => {
    getData(period);
  }, [period, endDate, startDate]);

  // if (loading) {
  //   return (
  //     <div className="bg-white rounded-lg shadow-md p-6">
  //       <div className="animate-pulse">
  //         <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
  //         <div className="h-64 bg-gray-200 rounded"></div>
  //       </div>
  //     </div>
  //   );
  // }

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

  console.log(data);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* day, week, month */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Chart</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePeriodChange("day")}
              className={`px-3 py-1 rounded text-sm font-medium ${
                period === "day"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => handlePeriodChange("week")}
              className={`px-3 py-1 rounded text-sm font-medium ${
                period === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => handlePeriodChange("month")}
              className={`px-3 py-1 rounded text-sm font-medium ${
                period === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* date picker */}
        <div>
          {/* start date */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="date" className="px-1">
              Select start date:
            </Label>
            <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {startDate ? startDate.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setStartDate(date);
                    setOpenStartDate(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* end date */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="date" className="px-1">
              Select end date:
            </Label>
            <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {endDate ? endDate.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={endDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setEndDate(date);
                    setOpenEndDate(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No revenue data available for the selected period.
            </p>
          </div>
        ) : (
          <div><RevenueChart dataChart={data}/></div>
        )}
      </div>
    </>
  );
};

export default ChartContainer;
