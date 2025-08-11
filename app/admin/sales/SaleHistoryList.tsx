"use client";
import SaleHistoryListRow from "@/app/staff/sale-history/StaffSaleHistoryListRow";
import SalesHistoryTable from "@/components/SaleHistoryTable";
import { SaleItem } from "@/lib/interfaces";

import React, { useMemo, useState } from "react";
import AdminSaleHistoryRow from "./AdminSaleHistoryRow";
import ListHeader from "@/components/ListHeader";
import { categorizedFilter, filterSearch } from "@/lib/utils";
import DatePicker from "@/components/DatePicker";
import { defaultEndDate, defaultStartDate } from "@/lib/constants";

const SaleHistoryList = ({ saleHistory }: { saleHistory: SaleItem[] }) => {
  // popover triggers
  const [openStartDate, setOpenStartDate] = React.useState(false);
  const [openEndDate, setOpenEndDate] = React.useState(false);

  // start and end dates for span
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    defaultStartDate
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    defaultEndDate
  );

  return (
    <>
      <DatePicker
        openStartDate={openStartDate}
        setOpenStartDate={setOpenStartDate}
        startDate={startDate}
        setStartDate={setStartDate}
        openEndDate={openEndDate}
        setOpenEndDate={setOpenEndDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <div className="mt-8">
        <SalesHistoryTable
          sales={saleHistory}
          tableHeads={[
            "Sale Id",
            "Product",
            "Price",
            "Quantity",
            "Date created",
            "Subtotal",
            "User",
          ]}
          tableRow={(sale: SaleItem, index) => (
            <AdminSaleHistoryRow sale={sale} key={index} />
          )}
        />
      </div>
    </>
  );
};

export default SaleHistoryList;
