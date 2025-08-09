import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { SaleItem } from "@/lib/interfaces";

const SaleHistoryListRow = ({ saleHistoy }: { saleHistoy: SaleItem }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{saleHistoy.sale.id}</TableCell>
      <TableCell>{saleHistoy.product.name}</TableCell>
      <TableCell>{saleHistoy.quantity}</TableCell>
      <TableCell>{saleHistoy.subtotal}</TableCell>
      <TableCell>
        {new Date(saleHistoy.sale.createdAt).toLocaleDateString()}
      </TableCell>
    </TableRow>
  );
};

export default SaleHistoryListRow;
