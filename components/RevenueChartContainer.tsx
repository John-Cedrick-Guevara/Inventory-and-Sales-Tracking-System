"use client";

import React, { useState, useEffect } from "react";
import RevenueChart from "./RevenueChart";

interface RevenueData {
  date: string;
  revenue: number;
  sales: number;
}

const RevenueChartContainer: React.FC = () => {
  const [data, setData] = useState<RevenueData[]>([]);
  const [period, setPeriod] = useState<"day" | "week" | "month">("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRevenueData = async (selectedPeriod: "day" | "week" | "month") => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/dashboard/revenue?period=${selectedPeriod}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch revenue data");
      }

      const revenueData = await response.json();
      setData(revenueData);
    } catch (err) {
      console.error("Error fetching revenue data:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueData(period);
  }, [period]);

  const handlePeriodChange = (newPeriod: "day" | "week" | "month") => {
    setPeriod(newPeriod);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Revenue Chart
          </h3>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => fetchRevenueData(period)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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

      {data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No revenue data available for the selected period.
          </p>
        </div>
      ) : (
        <RevenueChart data={data} period={period} />
      )}
    </div>
  );
};

export default RevenueChartContainer;
