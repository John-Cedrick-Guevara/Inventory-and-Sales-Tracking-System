"use client";
import { fetcher } from "@/lib/fetcher";
import { Sale, SaleItem } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import useSWR from "swr";

interface filterdata {
  name: string;
  value: number;
}

const salesPage = () => {
  const [filteredData, setFilteredData] = useState<filterdata[]>([]);
  const { data, error, isLoading, mutate } = useSWR<SaleItem[]>(
    "/api/saleItems",
    fetcher
  );

  console.log(data);
  useEffect(() => {
    if (data) {
      setFilteredData((prev) => {
        const updated = [...prev];

        for (const sale of data) {
          const index = updated.findIndex(
            (item) => item.name === sale.product.name
          );

          const amountToAdd = sale.subtotal ?? sale.price * sale.quantity;

          if (index !== -1) {
            updated[index] = {
              ...updated[index],
              value: amountToAdd,
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
    }
  }, [data]);

  console.log(filteredData);
  ``;

  // const data = [
  //   { name: "Jan", value: 100 },
  //   { name: "Feb", value: 200 },
  // ];
  return (
    <div>
      <h1>Revenue per product:</h1>
      <LineChart width={400} height={300} data={filteredData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default salesPage;
