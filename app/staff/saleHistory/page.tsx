"use client";
import { useAuth } from "@/app/Context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetcher } from "@/lib/fetcher";
import { Product, Sale } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { format } from "date-fns";

const saleHistory = () => {
  const user = useAuth();
  const [convertedSales, setConvertedSales] = useState<Sale[]>([]);

  const { data, error, isLoading, mutate } = useSWR<Sale[]>(
    `/api/sales?userId=${user?.id}`,
    fetcher
  );

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

  console.log(convertedSales);

  useEffect(() => {
    async function processSales() {
      if (!data) return;

      const updatedSales = await Promise.all(
        data.map(async (sale) => {
          const updatedItems = await Promise.all(
            sale.saleItems.map(async (item) => ({
              ...item,
              image: await byteObjectToBase64(item.product.image),
            }))
          );

          return {
            ...sale,
            saleItems: updatedItems,
          };
        })
      );

      setConvertedSales(updatedSales);
    }

    processSales();
  }, [data]);

  return (
    <div>
      <h1>Sale history:</h1>
      <div className="flex flex-col gap-2">
        {convertedSales?.map((sale) => {
          const date = new Date(sale.createdAt);
          const formattedDate = format(date, "yyyy-MM-dd HH:mm");

          return (
            <Card className="w-full gap-3 h-fit" key={sale.id}>
              <CardTitle className="flex items-center justify-between px-4">
                <h6 className=" text-slate-500">{formattedDate}</h6>
                <h6 className=" text-slate-500"> Total: {sale.total}</h6>
              </CardTitle>
              <hr />

              <CardContent className=" flex gap-1.5 flex-wrap items-center justify-center">
                {sale.saleItems?.map((item) => {
                  return (
                    <Card
                      key={item.product.id}
                      className="grid grid-cols-3 grid-rows-2 p-2 w-full max-w-sm"
                    >
                      <img
                        src={item.image}
                        alt="as "
                        className="object-cover h-20 w-20 row-span-2"
                      />

                      <h1 className="col-span-2">{item.product.name}</h1>
                      <h4 className="text-slate-500">
                        Quantity: {item.quantity}
                      </h4>
                      <h4 className="text-slate-500">
                        Subtotal: {item.subtotal}
                      </h4>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default saleHistory;
