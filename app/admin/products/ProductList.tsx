"use client";
import RefreshButton from "@/components/RefreshButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/interfaces";
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
import { Label } from "@radix-ui/react-label";
import { Plus, Loader2, Link, RefreshCcw } from "lucide-react";
import React, { useActionState } from "react";
import { unknown } from "zod/v4";
import { Textarea } from "@/components/ui/textarea";
import { addProduct } from "@/app/actions/products";

const ProductList = ({ products }: { products: Product[] }) => {
  const [addData, addAction, AddIsPending] = useActionState(
    addProduct,
    undefined
  );

  console.log(products);
  return (
    <section className="rounded-xl border-gray-300 shadow-sm">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-2 gap-2">
        <h1 className="font-medium text-2xl">Products List</h1>

        {/* create new product */}
        <Dialog>
          <DialogTrigger asChild className="ml-auto">
            <Button
              variant="outline"
              className="text-white bg-blue-600 hover:none"
            >
              <Plus />
              Create new Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create new product</DialogTitle>
              <DialogDescription>
                Create new product here. Click submit when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <form className="grid grid-cols-2 gap-4" action={addAction}>
              {/* product name */}
              <div className="grid gap-1 col-span-2">
                <Label htmlFor="product-name">Product name</Label>
                <Input required id="product-name" name="product-name" />
              </div>

              {/* product price */}
              <div className="grid gap-1">
                <Label htmlFor="product-price">Product price</Label>
                <Input
                  type="number"
                  required
                  id="product-price"
                  name="product-price"
                />
              </div>
              {/* product curren stock */}
              <div className="grid gap-1">
                <Label htmlFor="product-stock">Product stock</Label>
                <Input
                  type="number"
                  required
                  id="product-stock"
                  name="product-stock"
                />
              </div>

              {/* product image */}
              <div className="grid w-full max-w-sm items-center gap-1 col-span-2">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  required
                  name="product-image"
                  accept="image/"
                  id="picture"
                  type="file"
                />
              </div>

              {/* product description */}
              <div className="grid gap-1 col-span-2">
                <Label htmlFor="product-description">Product description</Label>
                <Textarea
                  required
                  id="product-description"
                  name="product-description"
                />
              </div>

              <DialogFooter className="col-start-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  className="bg-blue-700 text-white hover:bg-blue-600"
                  type="submit"
                >
                  {AddIsPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Input className="max-w-sm" />
        <RefreshButton />
      </div>
    </section>
  );
};

export default ProductList;
