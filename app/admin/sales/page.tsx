"use client";
import { fetcher } from "@/lib/fetcher";
import { Sale, SaleItem } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
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

interface filterdata {
  name: string;
  value: number;
}

const salesPage = () => {
  const [revenuePerProduct, setRevenuePerProduct] = useState<filterdata[]>([]);
  const [revenuePerDay, setRevenuePerDay] = useState<filterdata[]>([]);
  const [revenuePerMonth, setRevenuePerMonth] = useState<filterdata[]>([]);
  const [revenuePerYear, setRevenuePerYear] = useState<filterdata[]>([]);
  const [span, setSpan] = React.useState("Daily");
  const { data, error, isLoading, mutate } = useSWR<SaleItem[]>(
    "/api/saleItems",
    fetcher
  );

  useEffect(() => {
    const currentDay = new Date();
    if (data) {
      // revenue for each product
      setRevenuePerProduct((prev) => {
        const updated = [...prev];

        for (const sale of data) {
          const index = updated.findIndex(
            (item) => item.name === sale.product.name
          );

          const amountToAdd = sale.subtotal ?? sale.price * sale.quantity;

          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              value: updated[index].value + amountToAdd,
            };
          } else {
            updated.push({
              name: sale.product.name,
              value: amountToAdd,
            });
          }
        }

        return updated;
      });

      // revenue per day
      setRevenuePerDay((prev) => {
        const updated = [...prev];

        for (const sale of data) {
          const day = sale.sale.createdAt.slice(5, 10);
          const index = updated.findIndex((item) => item.name === day);

          const amountToAdd = sale.subtotal ?? sale.price * sale.quantity;

          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              value: updated[index].value + amountToAdd,
            };
          } else {
            updated.push({
              name: day,
              value: amountToAdd,
            });
          }
        }

        return updated;
      });

      // revenue per month
      setRevenuePerMonth((prev) => {
        const updated = [...prev];

        for (const sale of data) {
          const month = sale.sale.createdAt.slice(0, 7);

          const index = updated.findIndex((item) => item.name === month);

          const amountToAdd = sale.subtotal ?? sale.price * sale.quantity;

          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              value: updated[index].value + amountToAdd,
            };
          } else {
            updated.push({
              name: month,
              value: amountToAdd,
            });
          }
        }

        return updated;
      });

      // revenue per year
      setRevenuePerYear((prev) => {
        const updated = [...prev];

        for (const sale of data) {
          const year = sale.sale.createdAt.slice(0, 4);
          console.log(year);

          const index = updated.findIndex((item) => item.name === year);

          const amountToAdd = sale.subtotal ?? sale.price * sale.quantity;

          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              value: updated[index].value + amountToAdd,
            };
          } else {
            updated.push({
              name: year,
              value: amountToAdd,
            });
          }
        }

        return updated;
      });
    }
  }, [data]);

  return (
    <div className="grid  grid-cols-[fit-content(100%)_1fr] grid-rows-3 gap-4">
      {/* revenue per product */}
      <div className="shadow-lg rounded-xl w-full p-2">
        <h1 className="text-xl font-semibold">Revenue per product:</h1>
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={revenuePerProduct}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
      </div>

      {/* filterable revenue chart */}
      <div className="grid grid-cols-2 gap-4 shadow-lg rounded-xl w-full p-2">
        <h1 className="text-xl font-semibold">Filterable Revenue: </h1>
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

        <ResponsiveContainer className="col-span-2" width="100%" height={300}>
          <BarChart
            data={
              span === "Daily"
                ? revenuePerDay
                : span === "Monthly"
                ? revenuePerMonth
                : revenuePerYear
            }
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
              dataKey="value"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default salesPage;
