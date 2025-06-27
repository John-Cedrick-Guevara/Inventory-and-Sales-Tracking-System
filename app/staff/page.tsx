"use client";
import { ReceiptText, CirclePlus, CircleMinus, X } from "lucide-react";
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
  const [showCart, setShowCart] = useState(false);
  const [saleItems, setSaleItems] = useState<Product[]>([]);

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
    if (!saleItems.find((product) => product.id === item.id)) {
      setSaleItems([...saleItems, { ...item, quantity: 0 }]);
    }
    console.log(saleItems);
  }

  function editQuantity(id: number | undefined, operation: string) {
    if (operation === "add") {
      setSaleItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
            : item
        )
      );

      console.log(saleItems, id);
    } else if (operation === "minus") {
      setSaleItems((prev) =>
        prev.map((item) =>
          item.id === id && (item.quantity ?? 0) > 0
            ? { ...item, quantity: (item.quantity ?? 0) - 1 }
            : item
        )
      );
    }
  }

  function removeItem(id: number) {
    setSaleItems((prev) => prev.filter((item) => item.id !== id));
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
      <div className="sticky bottom-10 left-0 w-full z-40">
        {showCart && (
          <div className="absolute bottom-10 bg-white p-2 flex flex-col items-center justify-center gap-2  rounded-lg shadow-2xl">
            {saleItems.map((item) => (
              <div
                key={item.id}
                className="relative grid gap-2 grid-cols-3 grid-rows-2 py-2 px-4 rounded-lg shadow"
              >
                <div
                  onClick={() => removeItem(item.id)}
                  className="absolute right-2 top-2 cursor-pointer"
                >
                  <X />
                </div>
                <img
                  className="w-20 h-20 object-cover row-span-2"
                  src={item.image}
                  alt=""
                />
                <h1 className="col-span-2">{item.name}</h1>
                <p>Total: {(item.quantity ?? 1) * item.price}</p>
                <p className="flex items-center rounded-lg text-lg gap-2">
                  <span
                    onClick={() => editQuantity(item.id, "minus")}
                    className="bg-black text-white p-1"
                  >
                    <CircleMinus height={15} width={15} />
                  </span>
                  {item.quantity}
                  <span
                    onClick={() => editQuantity(item.id, "add")}
                    className="bg-black text-white p-1"
                  >
                    <CirclePlus height={15} width={15} />
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
        <div onClick={() => setShowCart((prev) => !prev)}>
          <IconButton
            variant="outline"
            IconButton={ReceiptText}
            tooltip={"See sales"}
          />
        </div>
      </div>
    </div>
  );
};

export default staffPage;
