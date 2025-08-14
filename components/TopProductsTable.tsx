import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductTable from "./ProductTable";
import { DashboardStats } from "@/lib/adminDashboardData";
import { TableCell, TableRow } from "./ui/table";
import ChartHeading from "./ChartHeading";
import PeriodDropDown from "./SelectPeriod";
const TopProductsTable = ({ stats }: { stats: DashboardStats }) => {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <ChartHeading>Top Products:</ChartHeading>

        {/* select period */}
        <PeriodDropDown period={period} setPeriod={setPeriod} />
      </div>

      <ProductTable
        products={
          period === "daily"
            ? stats.topToday
            : period === "weekly"
            ? stats.topWeek
            : stats.topMonth
        }
        tableHeads={["Product", "Quantity sold", "Total revenue"]}
        tableRow={(item: any, index: any) => (
          <TableRow key={index}>
            <TableCell className="text-left">{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.subTotal}</TableCell>
          </TableRow>
        )}
      />
    </div>
  );
};

export default TopProductsTable;
