"use client";
import { fetcher } from "@/lib/fetcher";
import { GetSaleItems, Sale, SaleItem } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import PaginationControls from "@/components/PaginationControls";

interface filterdata {
  name: string;
  staff: string;
  revenue: number;
}

const salesPage = () => {
  const [revenuePerProduct, setRevenuePerProduct] = useState<filterdata[]>([]);
  const [revenuePerStaff, setRevenuePerStaff] = useState<filterdata[]>([]);
  const [filteredData, setFilteredData] = useState<filterdata[]>([]);
  const [convertedSales, setConvertedSales] = useState<SaleItem[]>([]);

  const [years, setYears] = useState<{ [key: string]: string }[]>([
    {
      name: "All",
      value: "00",
    },
  ]);
  const [selectedMonth, setSelectedMonth] = useState("00");
  const [selectedYear, setSelectedYear] = useState("00");
  const [span, setSpan] = useState("Daily");
  const { data, error, isLoading, mutate } = useSWR<SaleItem[]>(
    `/api/saleItems`,
    fetcher
  );
  const [page, setPage] = useState(1);
  const pageSize = 2;

  const months: { [key: string]: string }[] = [
    { name: "All", value: "00" },
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  useEffect(() => {
    if (data) {
      // revenue for each product
      setRevenuePerProduct((prev) => {
        const updated = [...prev];

        for (const sale of data) {
          const index = updated.findIndex(
            (item) => item.name === sale.product.name
          );

          const amountToAdd =
            sale.subtotal ?? sale.product.price * sale.quantity;

          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              revenue: updated[index].revenue + amountToAdd,
            };
          } else {
            updated.push({
              name: sale.product.name,
              revenue: amountToAdd,
              staff: sale.sale.user.name,
            });
          }
        }

        return updated;
      });

      for (const sale of data) {
        const year = sale.sale.createdAt.slice(0, 4);
        const index = years.findIndex((item) => item.name === year);

        if (index === -1) {
          years.push({
            name: year,
            value: year,
          });
        }
      }

      setFilteredData((prev) => {
        let updated = [...prev];

        // revenue per day
        if (span === "Daily") {
          updated = [];
          for (const sale of data) {
            const day = sale.sale.createdAt.slice(5, 10);
            const month = sale.sale.createdAt.slice(5, 7);

            const index = updated.findIndex((item) => item.name === day);

            const amountToAdd =
              sale.subtotal ?? sale.product.price * sale.quantity;

            if (index !== -1) {
              updated[index] = {
                ...updated[index],
                revenue: updated[index].revenue + amountToAdd,
              };
            } else {
              if (selectedMonth === "00") {
                updated.push({
                  name: sale.sale.createdAt.slice(5, 10),
                  revenue: amountToAdd,
                  staff: sale.sale.user.name,
                });
              } else {
                if (month === selectedMonth) {
                  updated.push({
                    name: sale.sale.createdAt.slice(5, 10),
                    revenue: amountToAdd,
                    staff: sale.sale.user.name,
                  });
                }
              }
            }
          }
        }

        // revenue per month
        else if (span === "Monthly") {
          updated = [];
          for (const sale of data) {
            const month = sale.sale.createdAt.slice(0, 7);
            const year = sale.sale.createdAt.slice(0, 4);
            console.log(year);

            const index = updated.findIndex((item) => item.name === month);

            const amountToAdd =
              sale.subtotal ?? sale.product.price * sale.quantity;

            if (index !== -1) {
              updated[index] = {
                ...updated[index],
                revenue: updated[index].revenue + amountToAdd,
              };
            } else {
              if (selectedYear === "00") {
                updated.push({
                  name: month,
                  revenue: amountToAdd,
                  staff: sale.sale.user.name,
                });
              } else {
                if (year === selectedYear) {
                  updated.push({
                    name: month,
                    revenue: amountToAdd,
                    staff: sale.sale.user.name,
                  });
                }
              }
            }
          }
        }

        // revenue per year
        else {
          updated = [];
          for (const sale of data) {
            const year = sale.sale.createdAt.slice(0, 4);
            console.log(year);

            const index = updated.findIndex((item) => item.name === year);

            const amountToAdd =
              sale.subtotal ?? sale.product.price * sale.quantity;

            if (index !== -1) {
              updated[index] = {
                ...updated[index],
                revenue: updated[index].revenue + amountToAdd,
              };
            } else {
              updated.push({
                name: year,
                revenue: amountToAdd,
                staff: sale.sale.user.name,
              });
            }
          }
        }

        return updated;
      });
    }
  }, [data, span, selectedMonth, selectedYear]);

  // revenue per product
  useEffect(() => {
    setRevenuePerStaff((prev) => {
      let updated: filterdata[] = [];

      for (const sale of filteredData) {
        const index = updated.findIndex((item) => item.name === sale.staff);
        const amountToAdd = sale.revenue;

        if (index !== -1) {
          updated[index] = {
            ...updated[index],
            revenue: updated[index].revenue + amountToAdd,
          };
        } else {
          updated.push({
            name: sale.staff,
            staff: sale.staff,
            revenue: sale.revenue,
          });
        }
      }

      return updated;
    });
  }, [filteredData, span, selectedMonth, selectedYear]);

  function byteObjectToBase64(
    obj: Record<number, number>,
    mimeType = "image/png"
  ): Promise<string> {
    const byteArray = new Uint8Array(Object.values(obj));
    const blob = new Blob([byteArray], { type: mimeType });

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result); // base64 string
        } else {
          reject("Failed to convert blob to base64");
        }
      };
      reader.onerror = () => reject("FileReader error");
      reader.readAsDataURL(blob);
    });
  }

  useEffect(() => {
    async function convertImages() {
      if (!data) return;

      const result = await Promise.all(
        data.map(async (item) => {
          const base64Image = await byteObjectToBase64(
            item.product.image as any
          );
          return {
            ...item,
            image: base64Image,
          };
        })
      );

      setConvertedSales(result);
    }
    convertImages();
  }, [data]);

  console.log(convertedSales);

  return (
    <div className="grid max-md:flex flex-col  md:grid-cols-[fit-content(100%)_1fr] md:grid-rows-[fit-content(100%)_1fr] gap-4">
      {/* filterable revenue chart */}
      <Card className="grid col-span-2 grid-cols-3 gap-4 shadow-lg rounded-xl w-full p-2">
        <h1 className="text-xl font-semibold">Filterable Revenue: </h1>
        {/* which month if daily. which year if monthly*/}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {span === "Daily" ? "Select Month" : "Select Year"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Choose span of time</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={
                span === "Daily"
                  ? selectedMonth
                  : span === "Monthly"
                  ? selectedYear
                  : ""
              }
              onValueChange={
                span === "Daily"
                  ? setSelectedMonth
                  : span === "Monthly"
                  ? setSelectedYear
                  : setSpan
              }
            >
              {(span === "Daily"
                ? months
                : span === "Monthly"
                ? years
                : []
              ).map((item) => (
                <DropdownMenuRadioItem key={item.name} value={item.value}>
                  {item.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* yearly, monthly, daily */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{span}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Choose span of time</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={span} onValueChange={setSpan}>
              <DropdownMenuRadioItem value="Daily">Daily</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Monthly">
                Monthly
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Yearly">
                Yearly
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <ResponsiveContainer className="col-span-3" width="100%" height={300}>
          <BarChart
            data={filteredData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* revenue per product */}
      <Card className="shadow-lg rounded-xl w-full min-w-xs p-2 min-h-60">
        <h1 className="text-xl font-semibold">Revenue per product:</h1>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              dataKey="revenue"
              isAnimationActive={false}
              data={revenuePerProduct}
              outerRadius={80}
              fill="#8884d8"
              label
            />

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* staff number of sales (bar chart) */}
      <Card className="grid grid-cols-2 gap-4 shadow-lg rounded-xl w-full p-2 ">
        <h1 className="text-xl font-semibold">Revenue per staff: </h1>

        <ResponsiveContainer className="col-span-2" width="100%" height={300}>
          <BarChart
            data={revenuePerStaff}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Sales history*/}
      <Card className="relative shadow-lg rounded-xl w-full p-2 col-span-2">
        <h1 className="text-xl font-semibold">Sales History: </h1>

        <div className="flex flex-col gap-2 relative pb-20">
          {convertedSales?.map((item, index) => {
            const date = new Date(item.sale.createdAt);
            const formattedDate = format(date, "yyyy-MM-dd HH:mm");
            return (
              <Card
                key={index}
                className="grid grid-cols-[fit-content(100%)_1fr_1fr] grid-rows-2 p-2 gap-2"
              >
                <img
                  src={item.image}
                  className="object-cover w-20 h-20 row-span-2"
                  alt=""
                />
                <h1>Product name: {item.product.name}</h1>
                <h4>Date: {formattedDate}</h4>
                <h4>Staff name: {item.sale.user.name}</h4>
                <h4>Price: {item.product.price}</h4>
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default salesPage;
