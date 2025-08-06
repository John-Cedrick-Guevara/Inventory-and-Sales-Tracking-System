"use client";
import React, { useActionState, useState } from "react";
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
import { Loader2, Plus } from "lucide-react";
import { addProduct, editProduct } from "@/app/actions/products";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Categories } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import DropdownCategory from "@/components/DropdownCategory";

export const AddProduct = ({ categories }: { categories: Categories[] }) => {
  const [category, setCategory] = useState("");
  const [addData, addAction, AddIsPending] = useActionState(
    addProduct,
    undefined
  );
  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto">
        <Button variant="outline" className="text-white bg-blue-600 hover:none">
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
          <div className="grid w-full max-w-sm items-center gap-1 ">
            <Label htmlFor="picture">Picture</Label>
            <Input
              required
              name="product-image"
              accept="image/"
              id="picture"
              type="file"
            />
          </div>

          {/* categories */}
          <div className="grid w-full max-w-sm items-center gap-1 ">
            <Label htmlFor="picture">Select Category</Label>
            <Input required value={category} name="category" type="hidden" />
            <DropdownCategory
              categories={categories}
              category={category}
              setCategory={setCategory}
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
  );
};

export const EditProduct = ({
  id,
  className,
  categories,
}: {
  id: number | undefined;
  className: string;
  categories: Categories[];
}) => {
  const [category, setCategory] = useState("");
  const [editData, editAction, editIsPending] = useActionState(
    editProduct,
    undefined
  );
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "flex items-center gap-2 p-1 rounded-md transition-colors", // base styles
          className // incoming from parent (e.g., hover:bg-blue-100 etc.)
        )}
      >
        Edit
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Edit product here. Fill the fields to be edited only. Click submit
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid grid-cols-2 gap-4" action={editAction}>
          {/* product id */}
          <Input type="hidden" value={id} id="product-id" name="id" />

          {/* product name */}
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="product-name">Product name</Label>
            <Input id="product-name" name="name" />
          </div>

          {/* product price */}
          <div className="grid gap-1">
            <Label htmlFor="product-price">Product price</Label>
            <Input type="number" id="product-price" name="price" />
          </div>
          {/* product curren stock */}
          <div className="grid gap-1">
            <Label htmlFor="product-stock">Product stock</Label>
            <Input type="number" id="product-stock" name="stock" />
          </div>

          {/* product image */}
          <div className="grid w-full max-w-sm items-center gap-1 ">
            <Label htmlFor="picture">Picture</Label>
            <Input name="image" accept="image/" id="picture" type="file" />
          </div>

          {/* categories */}
          <div className="grid w-full max-w-sm items-center gap-1 ">
            <Label htmlFor="picture">Select Category</Label>
            <Input required value={category} name="category" type="hidden" />
            <DropdownCategory
              categories={categories}
              category={category}
              setCategory={setCategory}
            />
          </div>

          {/* product description */}
          <div className="grid gap-1 col-span-2">
            <Label htmlFor="product-description">Product description</Label>
            <Textarea id="product-description" name="description" />
          </div>

          <DialogFooter className="col-start-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              className="bg-blue-700 text-white hover:bg-blue-600"
              type="submit"
            >
              {editIsPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
