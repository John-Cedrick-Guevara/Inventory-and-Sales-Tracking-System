"use client";
import React, { useActionState, useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { BaggageClaim, CloudFog, Loader2, Minus, Plus, X } from "lucide-react";
import { useUser } from "@/app/Context/UserContext";
import { AddSaleQueItem } from "@/lib/interfaces";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

const AddSaleDialog = ({
  saleQue,
  setSaleQue,
}: {
  saleQue: AddSaleQueItem[];
  setSaleQue: React.Dispatch<React.SetStateAction<AddSaleQueItem[]>>;
}) => {
  const userData: any = useUser();
  const [addIsPending, setAddIsPending] = useState(false);

  // gets the total amount of sale
  const saleTotal = useMemo(() => {
    return saleQue.reduce(
      (total, currntSubtotal) => total + currntSubtotal.subTotal,
      0
    );
  }, [saleQue]);

  // submits sale
  async function submitSale(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(saleQue);

    if (saleQue.length === 0) alert("bobo mag lagay ka ng item");
    else {
      setAddIsPending(true);
      try {
        const newSale = await axios.post("/api/sales", {
          userId: userData.id,
          total: saleTotal,
          saleItems: saleQue,
        });

        setSaleQue([]);
      } catch (error) {
        console.log(error);
      } finally {
        setAddIsPending(false);
      }
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className="flex items-center cursor-pointer gap-2 px-2 py-1 rounded-md transition-colors border bg-blue-700 text-blue-100">
          Add sale que
          <BaggageClaim width={20} height={20} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Sale</DialogTitle>
            <DialogDescription>
              Add sale here. Change quantity field as you want. Click submit
              when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4 transition-all"
            onSubmit={submitSale}
          >
            {/* added item list */}
            <div className="flex flex-col gap-1 h-auto max-h-52 overflow-auto">
              {saleQue.map((item, index) => (
                <div
                  className="grid space-x-2 grid-cols-[auto_1fr_1fr_auto] grid-rows-[repeat(2,_auto)] bg-gray-100 py-1 px-2 rounded-xl"
                  key={index}
                >
                  <img
                    src={item.image}
                    className="object-cover aspect-square w-12 row-span-2"
                    alt=""
                  />

                  {/* product name */}
                  <h1 className="text-md font-semibold">{item.name}</h1>

                  {/* product quantity */}
                  <Input
                    className="py-1 px-2 w-fit ml-auto mr-0"
                    min={0}
                    max={20}
                    type="number"
                    id="quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      setSaleQue(() =>
                        saleQue.map((saleItem) => {
                          if (saleItem.id === item.id) {
                            const newQuantity = Number(e.target.value);
                            return {
                              ...saleItem,
                              quantity: newQuantity,
                              subTotal: newQuantity * saleItem.price,
                            };
                          }
                          return saleItem;
                        })
                      )
                    }
                    placeholder="Quantity"
                  />

                  <X
                    onClick={() =>
                      setSaleQue((prev) =>
                        prev.filter((saleItem) => saleItem.id !== item.id)
                      )
                    }
                    className="row-span-2 self-center mr-0 ml-2 cursor-pointer"
                    width={15}
                  />

                  {/* product category */}
                  <h1 className="text-sm text-slate-500 font-semibold">
                    {item.category?.name}
                  </h1>

                  {/* quantity */}
                  <input
                    type="hidden"
                    defaultValue={item.quantity * item.price}
                    name="subtotal"
                    required
                  />

                  {/* total amount */}
                  <h1 className=" text-blue-700 font-semibold h-fit text-right text-sm">
                    Subtotal: P{item.subTotal.toLocaleString()}
                  </h1>
                </div>
              ))}
              <hr className="my-2" />
              <h1 className=" text-right font-semibold text-md p-2 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-between">
                Total: <span>P{saleTotal.toLocaleString()}</span>{" "}
              </h1>
            </div>
            <DialogFooter className="col-start-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                className="bg-blue-700 text-white hover:bg-blue-600"
                type="submit"
              >
                {addIsPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Add Sale"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSaleDialog;
