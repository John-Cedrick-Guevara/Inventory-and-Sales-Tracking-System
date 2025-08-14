"use client";
import React from "react";
import SaleHistoryListRow from "@/app/staff/sale-history/StaffSaleHistoryListRow";
import SalesHistoryTable from "@/components/SaleHistoryTable";
import { SaleItem } from "@/lib/interfaces";

import { useEffect, useState } from "react";
import AdminSaleHistoryRow from "@/app/admin/sales/AdminSaleHistoryRow";
import StaffSaleHistoryListRow from "@/app/staff/sale-history/StaffSaleHistoryListRow";

import DatePicker from "@/components/DatePicker";
import { defaultEndDate, defaultStartDate, pageLimit } from "@/lib/constants";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import PaginationControl from "./PaginationControl";

const SalesHistory = ({ user }: { user: { role: string; name: string } }) => {
  // salesItems data
  const [saleHistory, setSalesItem] = useState<SaleItem[]>([]);

  // pagination current page and total pages
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

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
        `/api/sales?startSpanDate=${startDate}&endSpanDate=${endDate}&limit=${pageLimit}&page=${page}`
      );

      setSalesItem(res.data.data);
      setTotalPage(res.data.totalPage);
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
  }, [startDate, endDate, page]);

  return (
    <section className="h-[100vh]">
      <div className="bg-white card mt-10 dark:bg-gray-800 dark:border-gray-600 ">
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
          <Skeleton className="h-50 bg-gray-200 rounded  mt-8"></Skeleton>
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
      {/* pagination */}
      <PaginationControl toalPage={totalPage} page={page} setPage={setPage} />
    </section>
  );
};

export default SalesHistory;
