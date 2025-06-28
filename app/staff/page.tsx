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
import { handleChange } from "@/lib/handleChange";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const staffPage = () => {
  const user = useAuth();
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
      setSaleItems([...saleItems, { ...item, quantity: 1 }]);
    }
  }

  function handleQuantityChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number | undefined
  ) {
    const value = e.target.value;
    setSaleItems((prev) =>
      prev.map((item) =>
        item.id === id && (item.quantity ?? 0) > 0
          ? { ...item, quantity: value === "" ? 1 : parseInt(e.target.value) }
          : item
      )
    );
  }

  function removeItem(id: number | undefined) {
    setSaleItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function addSale() {
    let total = 0;

    const itemsToPass = saleItems.map((item) => ({
      ...item,
      subtotal: (item.quantity ?? 1) * item.price,
    }));

    for (const item of itemsToPass) {
      total += item.subtotal;
    }

    try {
      await axios.post("/api/sales", {
        userId: user?.id,
        total: total,
        items: itemsToPass,
      });

      setSaleItems([]);
      total = 0;
    } catch (error) {
      console.log(error);
    }
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
      {/* cart */}
      <div className="sticky bottom-10 left-0 w-full z-40">
        {showCart && (
          <div className="absolute bottom-10 bg-white p-2 flex flex-col items-center justify-center gap-2  rounded-lg shadow-2xl">
            {saleItems.map((item) => (
              <div
                key={item.id}
                className="relative grid gap-2 grid-cols-3 grid-rows-2 py-2 px-4 rounded-lg shadow"
              >
                {/* remove button */}
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
                <p>Total: {item.total}</p>
                {/* edit quantity  */}
                <div className="flex items-center justify-center rounded-lg text-lg  ">
                  <p className="text-slate-500">Quantity: </p>
                  <input
                    className="w-10"
                    type="number"
                    min={1}
                    value={item.quantity === 0 ? "" : item.quantity}
                    onChange={(e) => handleQuantityChange(e, item.id)}
                  />
                </div>
              </div>
            ))}

            {saleItems.length > 0 && (
              <Button onClick={addSale} variant={"outline"} className="w-full">
                Add sale
              </Button>
            )}
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
