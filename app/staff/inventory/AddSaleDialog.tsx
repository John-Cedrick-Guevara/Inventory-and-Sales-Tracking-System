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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Minus, Plus } from "lucide-react";
import { editProduct } from "@/app/actions/products";

const AddSaleDialog = ({
  className,
  id,
  name,
  price,
}: {
  className: string;
  id: number | undefined;
  name: string;
  price: number;
}) => {
  const [quantity, setQuantity] = useState(0);
  const [editData, editAction, editIsPending] = useActionState(
    editProduct,
    undefined
  );
  return (
    <div>
      <Dialog>
        <DialogTrigger
          className={cn(
            "flex items-center cursor-pointer gap-2 p-1 rounded-md transition-colors", // base styles
            className // incoming from parent (e.g., hover:bg-blue-100 etc.)
          )}
        >
          Add Sale
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
              <Input
                id="product-name"
                name="name"
                defaultValue={name}
                disabled
              />
            </div>

            {/* quantity */}
            <div className="gap-2">
              <div className="grid gap-2 w-full">
                <Label htmlFor="quantity">Quantity Sold</Label>

                <Input
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={0}
                  max={100}
                  id="quantity"
                  name="quantity"
                  type="number"
                />
              </div>
            </div>

            {/* total amount */}
            <h1 className="bg-blue-100 text-blue-700 font-semibold h-fit p-2 rounded-lg w-full self-end text-center">
              Total Price: P{quantity * price}
            </h1>

            {/* sale remakrs*/}
            <div className="grid gap-1 col-span-2">
              <Label htmlFor="sale-remarks">Remarks (Optional)</Label>
              <Textarea
                id="sale-remarks"
                name="sale-remarks"
                placeholder="Add any notes about about this sale..."
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
                {editIsPending ? (
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
