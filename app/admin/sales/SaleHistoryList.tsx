import SaleHistoryListRow from "@/app/staff/sale-history/StaffSaleHistoryListRow";
import SalesHistoryTable from "@/components/SaleHistoryTable";
import { SaleItem } from "@/lib/interfaces";

import React from "react";
import AdminSaleHistoryRow from "./AdminSaleHistoryRow";

const SaleHistoryList = ({ saleHistory }: { saleHistory: SaleItem[] }) => {
  return (
    <>
      <SalesHistoryTable
        sales={saleHistory}
        tableHeads={[
          "Sale Id",
          "Product",
          "Price",
          "Quantity",
          "Subtotal",
          "User",
        ]}
        tableRow={(sale: SaleItem, index) => (
          <AdminSaleHistoryRow sale={sale} key={index} />
        )}
      />
    </>
  );
};

export default SaleHistoryList;
