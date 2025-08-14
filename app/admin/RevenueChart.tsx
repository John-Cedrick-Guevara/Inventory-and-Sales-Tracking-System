import { RevenueData } from "@/lib/interfaces";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ dataChart }: { dataChart: RevenueData[] }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  // hover tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/50 p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Period: ${label}`}</p>
          <p className="text-blue-500">{`Revenue: ${formatCurrency(
            payload[0].value
          )}`}</p>
          <p className="text-cyan-500">{`Sales Count: ${payload[1].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full min-w-4xl h-96 ">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className={"overflow-auto"}
      >
        <BarChart
          barSize={50}
          data={dataChart}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fill: "#3B82F6", fontSize: 15, fontWeight: 500 }}
          />
          <YAxis
            tick={{ fill: "#3B82F6", fontSize: 15, fontWeight: 500 }}
            yAxisId="left"
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <YAxis
            tick={{ fill: "#3B82F6", fontSize: 15, fontWeight: 500 }}
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="revenue"
            fill="#3B82F6 "
            name="Revenue"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="sales"
            fill="#06B6D4"
            name="Sales Count"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
