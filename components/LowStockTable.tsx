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

const LowStockTable = ({ stats }: { stats: DashboardStats }) => {
  const [period, setPeriod] = useState("today");

  return (
    <div className="space-y-7">
      <ChartHeading>Low Stock Products:</ChartHeading>

      <ProductTable
        products={stats.lowStock}
        tableHeads={["Product", "Stock"]}
        tableRow={(item: any, index: any) => (
          <TableRow key={index}>
            <TableCell className="text-left">{item.name}</TableCell>
            <TableCell>{item.stock}</TableCell>
          </TableRow>
        )}
      />
    </div>
  );
};

export default LowStockTable;
