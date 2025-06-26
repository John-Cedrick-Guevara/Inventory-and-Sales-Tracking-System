"use client";
import { ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { fetcher } from "@/lib/fetcher";
import { Product } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import IconButton from "@/components/IconButton";

const staffPage = () => {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    "/api/products",
    fetcher
  );
  const [itemsWithBase64, setItemsWithBase64] = useState<Product[]>([]);
  const [itemToAddSale, setItemToAddSale] = useState<Product>();

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
          const base64Image = await byteObjectToBase64(item.image);
          return {
            ...item,
            image: base64Image,
          };
        })
      );

      setItemsWithBase64(result);
    }
    convertImages();
  }, [data]);

  function getItem(item: Product) {
    setItemToAddSale(item);
  }

  return (
    <div className="relative flex flex-wrap gap-2 items-center justify-center  ">
      {itemsWithBase64.map((item) => (
        <Card
          onClick={() => getItem(item)}
          className="w-full max-w-xs h-fit"
          key={item.id}
        >
          <CardHeader>
            <CardContent>
              <img className="w-lg h-52 object-cover" src={item.image} alt="" />
            </CardContent>
            <CardTitle className="text-xl">
              {item.name.slice(0, 1).toUpperCase() + item.name.slice(1, -1)}
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <CardDescription className="flex justify-between w-full">
              <p>${item.price}</p>
              <p>Stock :{item.stock}</p>
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <CardAction>
              <Button variant={"default"} size={"lg"} className="w-full">
                Add sales
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      ))}
      <div className=" fixed bottom-10 left-0 w-full z-40">
        <IconButton
          variant="outline"
          IconButton={ReceiptText}
          tooltip={"See sales"}
        />
      </div>
    </div>
  );
};

export default staffPage;
