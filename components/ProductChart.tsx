import { RevenueData } from "@/lib/interfaces";
import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

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
  return (
    <div className="w-full h-full ">
      <h1 className="text-xl font-bold text-gray-500 py-2 px-3 rounded-2xl bg-blue-100 mr-auto self-center w-fit">
        Product:
      </h1>

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
            fill="#3B82F6 "
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductChart;
