import { RevenueData } from "@/lib/interfaces";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartHeading from "./ChartHeading";

const ProductChart = ({ dataChart }: { dataChart: RevenueData[] }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const salesValue = payload.find((p: any) => p.dataKey === "sales")?.value;
      const revenueValue = payload.find(
        (p: any) => p.dataKey === "revenue"
      )?.value;
      const productName = payload[0]?.payload?.name; // comes from your data object

      return (
        <div className="bg-white/90 p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Product: ${productName}`}</p>
          <p className="text-blue-500">{`Sales: ${salesValue}`}</p>
          <p className="text-cyan-500">{`Revenue: ₱${revenueValue?.toLocaleString()}`}</p>
        </div>
      );
    }
  };
  const COLORS = ["#3B82F6", "#06B6D4", "#A855F7", "#F59E0B", "#10B981"];

  return (
    <div className="w-full h-full ">
      <ChartHeading>Product:</ChartHeading>

      <ResponsiveContainer width="100%" height="90%">
        <PieChart width={200} height={200}>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={dataChart}
            dataKey="revenue"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            label
          >
            {dataChart.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductChart;
