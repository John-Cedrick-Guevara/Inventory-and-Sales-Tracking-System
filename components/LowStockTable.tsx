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

const LowStockTable = ({ stats }: { stats: DashboardStats }) => {
  const [period, setPeriod] = useState("today");

  return (
    <ProductTable
      products={stats.lowStock}
      tableHeads={["Product", "Stock"]}
      tableRow={(item: any, index: any) => (
        <TableRow key={index}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.stock}</TableCell>
        </TableRow>
      )}
    />
  );
};

export default LowStockTable;
