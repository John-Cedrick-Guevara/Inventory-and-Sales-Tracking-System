"use client";
import React from "react";
import SaleHistoryListRow from "@/app/staff/sale-history/StaffSaleHistoryListRow";
import SalesHistoryTable from "@/components/SaleHistoryTable";
import { SaleItem } from "@/lib/interfaces";

import { useEffect, useState } from "react";
import AdminSaleHistoryRow from "@/app/admin/sales/AdminSaleHistoryRow";
import StaffSaleHistoryListRow from "@/app/staff/sale-history/StaffSaleHistoryListRow";

import DatePicker from "@/components/DatePicker";
import { defaultEndDate, defaultStartDate } from "@/lib/constants";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";

const SalesHistory = ({ user }: { user: { role: string; name: string } }) => {
  // salesItems data
  const [saleHistory, setSalesItem] = useState<SaleItem[]>([]);

  // popover triggers
  const [openStartDate, setOpenStartDate] = React.useState(false);
  const [openEndDate, setOpenEndDate] = React.useState(false);

  // loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // start and end dates for span
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    defaultStartDate
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    defaultEndDate
  );

  // fetcher
  const fetchSales = async (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `/api/sales?startSpanDate=${startDate}&endSpanDate=${endDate}`
      );

      setSalesItem(res.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // calls fetcher
  useEffect(() => {
    fetchSales(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="bg-white card mt-10">
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
      {loading ? (
        <Skeleton className="h-70 bg-gray-200 rounded  mt-8"></Skeleton>
      ) : (
        <SalesHistoryTable
          sales={saleHistory}
          tableHeads={
            user.role === "ADMIN"
              ? [
                  "Sale Id",
                  "Product",
                  "Price",
                  "Quantity",
                  "Date created",
                  "Subtotal",
                  "User",
                ]
              : ["Id", "Product", "Quantity", "Price", "Date"]
          }
          tableRow={(sale: SaleItem, index) =>
            user.role === "ADMIN" ? (
              <AdminSaleHistoryRow sale={sale} key={index} />
            ) : (
              <StaffSaleHistoryListRow sale={sale} key={index} />
            )
          }
        />
      )}
    </div>
  );
};

export default SalesHistory;
