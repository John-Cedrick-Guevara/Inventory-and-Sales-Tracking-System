import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { SaleItem } from "@/lib/interfaces";

const StaffSaleHistoryListRow = ({ sale }: { sale: SaleItem }) => {
  if (!sale) {
    return (
      <TableRow>
        <TableCell colSpan={8} className="text-center text-gray-500">
          Invalid product data
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{sale.sale.id}</TableCell>
      <TableCell>{sale.product.name}</TableCell>
      <TableCell>{sale.quantity}</TableCell>
      <TableCell>{sale.subtotal}</TableCell>
      <TableCell>
        {new Date(sale.sale.createdAt).toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
};

export default StaffSaleHistoryListRow;
