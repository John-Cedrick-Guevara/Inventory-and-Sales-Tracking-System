"use client";
import { Categories } from "@/lib/interfaces";
import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import RefreshButton from "@/components/RefreshButton";
import { Plus, Loader2, PencilLineIcon, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { unknown } from "zod/v4";
import { addCategory, editCategory } from "@/app/actions/category";
import axios from "axios";

const CategoryList = ({ categories }: { categories: Categories[] }) => {
  const [addData, addAction, addIsPending] = useActionState(
    addCategory,
    undefined
  );
  const [editData, editAction, editIsPending] = useActionState(
    editCategory,
    undefined
  );

  async function handleDeleteCategory(id: number | undefined) {
    console.log(id);
    try {
      await axios.delete(`/api/categories/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="rounded-xl border-gray-300 shadow-sm">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-2 gap-2">
        <h1 className="font-medium text-2xl">Users List</h1>

        {/* create new user */}
        <Dialog>
          <DialogTrigger asChild className="ml-auto">
            <Button
              variant="outline"
              className="text-white bg-blue-600 hover:none"
            >
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
        <Input className="max-w-sm" />
        <RefreshButton />
      </div>

      {categories.map((category, index) => (
        <div
          key={index}
          className="border-t p-2 px-4 border-t-gray-200 grid grid-rows-[1fr_auto] grid-cols-[30px_1fr_auto]"
        >
          <h1 className="text-md  row-span-2 self-center ">{category.id}</h1>
          <h1 className="text-md  row-span-2 self-center ">{category.name}</h1>

          <div className="flex gap-2 self-center row-span-2">
            {/* edit user dialog */}
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
                    Edit category's credentials here. Only change the fields to
                    be edited. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4" action={editAction}>
                  <Input
                    required
                    id="id"
                    name="id"
                    type="hidden"
                    value={category.id}
                  />
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

            {/* delete user dialog */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash2
                  width={35}
                  height={35}
                  className="bg-red-100 text-red-700 p-1 rounded-md cursor-pointer"
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure to delete {category.name}?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    {category.name}'s account and remove data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-700 text-white hover:bg-red-800"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategoryList;
