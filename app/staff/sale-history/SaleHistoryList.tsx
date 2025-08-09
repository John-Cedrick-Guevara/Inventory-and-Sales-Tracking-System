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
import StaffSaleHistoryListRow from "./StaffSaleHistoryListRow";
import SalesHistoryTable from "@/components/SaleHistoryTable";

const SaleHistoryList = ({ saleHistory }: { saleHistory: SaleItem[] }) => {
  return (
    <>
      <SalesHistoryTable
        sales={saleHistory}
        tableHeads={["Id", "Product", "Quantity", "Price", "Date"]}
        tableRow={(sale: SaleItem, index) => (
          <StaffSaleHistoryListRow sale={sale} key={index} />
        )}
      />
    </>
  );
};

export default SaleHistoryList;
