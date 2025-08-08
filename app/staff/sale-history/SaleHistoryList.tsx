import { SaleItem } from "@/lib/interfaces";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SaleHistoryListRow from "./SaleHistoryListRow";

const SaleHistoryList = ({ saleHistoy }: { saleHistoy: SaleItem[] }) => {
  return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {saleHistoy.map((item, index) => (
            <SaleHistoryListRow key={index} saleHistoy={item} />
          ))}
        </TableBody>
      </Table>
  );
};

export default SaleHistoryList;
