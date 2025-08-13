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
const TopProductsTable = ({ stats }: { stats: DashboardStats }) => {
  const [period, setPeriod] = useState("today");

  return (
    <div>
      <Select onValueChange={(item) => setPeriod(item)}>
        <SelectTrigger className="w-[180px] mb-5">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
        </SelectContent>
      </Select>

      <ProductTable
        products={
          period === "today"
            ? stats.topToday
            : period === "week"
            ? stats.topWeek
            : stats.topMonth
        }
        tableHeads={["Product", "Quantity sold", "Total revenue"]}
        tableRow={(item: any, index: any) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.subTotal}</TableCell>
          </TableRow>
        )}
      />
    </div>
  );
};

export default TopProductsTable;
