import { TableRow, TableCell } from "@/components/ui/table";
import { SaleItem } from "@/lib/interfaces";

import React from "react";

const AdminSaleHistoryRow = ({ sale }: { sale: SaleItem }) => {
  const status = "Published";

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
      <TableCell>{sale.sale.id || 0}</TableCell>
      <TableCell>{sale.product.name || "Product not found"}</TableCell>
      <TableCell>${sale.product.price.toLocaleString() || 0}</TableCell>
      <TableCell>{sale.quantity}</TableCell>
      <TableCell>${sale.subtotal.toLocaleString()}</TableCell>
      <TableCell>{sale.sale.user.name}</TableCell>
    </TableRow>
  );
};

export default AdminSaleHistoryRow;
