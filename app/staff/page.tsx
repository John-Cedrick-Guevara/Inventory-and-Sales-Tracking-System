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
import { GetProduct, Product } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import IconButton from "@/components/IconButton";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { Input } from "@/components/ui/input";
import FilterBar from "@/components/FilterBar";
import PaginationControls from "@/components/PaginationControls";

const staffPage = () => {
  const user = useAuth();
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const { data, error, isLoading, mutate } = useSWR<GetProduct>(
    `/api/products?page=${page}&pageSize=${pageSize}`,
    fetcher
  );
  const [itemsWithBase64, setItemsWithBase64] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [saleItems, setSaleItems] = useState<Product[]>([]);
  const [categories, setCtegories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchItem, setSearchItem] = useState<string>("");

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
        data.data.map(async (item) => {
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
    if (data) {
      setCtegories((prev) => {
        const updated = [...prev];
        for (const item of data.data) {
          if (!updated.includes(item.category?.name as string)) {
            updated.push(item.category?.name as string);
          }
        }

        return updated;
      });
    }
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
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  console.log(itemsWithBase64);

  return (
    <div className="relative pb-20">
      {/* filters */}
      <FilterBar
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* items container */}
      <div className="flex flex-wrap gap-2 items-center justify-center ">
        {itemsWithBase64
          .filter((item) =>
            searchItem
              ? item.name.toLowerCase().includes(searchItem.toLowerCase())
              : item && selectedCategory
              ? item.category?.name === selectedCategory
              : item
          )
          .map((item) => (
            <Card className="w-full max-w-xs h-fit" key={item.id}>
              <CardHeader>
                <img
                  className="w-full aspect-square object-cover"
                  src={item.image}
                  alt=""
                />

                <CardTitle className="text-xl">
                  {item.name.slice(0, 1).toUpperCase() + item.name.slice(1)}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
                <CardDescription className="flex justify-between w-full">
                  <p>${item.price}</p>
                  <p>Stock :{item.stock}</p>
                  <p>Category:{String(item.category?.name)}</p>
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  onClick={() => getItem(item)}
                  variant={"default"}
                  disabled={item.stock === 0}
                  size={"lg"}
                  className="w-full cursor-pointer"
                >
                  Add sales
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>

      {/* cart */}
      <div className="sticky bottom-10 left-0 w-fit z-10">
        {showCart && (
          <div className="absolute bottom-12 bg-white p-2 flex flex-col items-center justify-center gap-2  rounded-lg shadow-2xl">
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
                    max={item.stock}
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
        <div className="relative" onClick={() => setShowCart((prev) => !prev)}>
          <span className="absolute -top-6 -left-2 p-2 rounded-full bg-slate-100 z-30">
            {saleItems.length}
          </span>
          <IconButton
            variant="outline"
            IconButton={ReceiptText}
            tooltip={"See sales"}
          />
        </div>
      </div>

      <PaginationControls data={data} setPage={setPage} page={page} />
    </div>
  );
};

export default staffPage;
