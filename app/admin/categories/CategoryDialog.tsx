"use client";
import React, { useActionState } from "react";
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
import { Plus, Loader2, PencilLineIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { addCategory, editCategory } from "@/app/actions/category";

export const AddCategory = () => {
  // form function
  const [addData, addAction, addIsPending] = useActionState(
    addCategory,
    undefined
  );

  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto">
        <Button variant="outline" className="text-white bg-blue-600 hover:none">
          <Plus />
          Create new category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>
          <DialogDescription>
            Create new category here. Click submit when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" action={addAction}>
          {/* category name */}
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input required id="name" name="name" />
          </div>

          <DialogFooter>
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
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const EditCategory = ({ id }: { id: number | undefined }) => {
  const [editData, editAction, editIsPending] = useActionState(
    editCategory,
    undefined
  );
  return (
    <Dialog>
      <DialogTrigger className="ml-auto">
        <PencilLineIcon
          width={35}
          height={35}
          className="bg-blue-100 text-blue-700 p-1 rounded-md cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>
            Edit category's credentials here. Only change the fields to be
            edited. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" action={editAction}>
          {/* category id */}
          <Input required id="id" name="id" type="hidden" value={id} />
          
          {/* category name */}
          <div className="grid gap-3">
            <Label htmlFor="name">New name</Label>
            <Input id="name" name="new-name" />
          </div>

          <DialogFooter>
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
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
