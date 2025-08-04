"use client";
import { Categories } from "@/lib/interfaces";
import React, { useActionState, useMemo, useState } from "react";
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
import ListHeader from "@/components/ListHeader";
import { AddCategory, EditCategory } from "./CategoryDialog";
import { filterSearch } from "@/lib/utils";



const CategoryList = ({ categories }: { categories: Categories[] }) => {
  const [searchCategory, setSearchCategory] = useState("");

  const filteredCategories: Categories[] = useMemo(
    () => filterSearch(searchCategory, categories),
    [searchCategory, categories]
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
    <section>
      {/* header */}
      <ListHeader
        searchQuery={searchCategory}
        setSearchQuery={setSearchCategory}
        title={"Category"}
        AddDialog={<AddCategory />}
      />

      {/* list */}
      <div className="rounded-xl border border-gray-200 shadow-sm mt-8 ">
        <div className="p-2 px-4">
          <h1 className="text-lg font-medium">Categories</h1>
        </div>
        {filteredCategories?.map((category, index) => (
          <div
            key={index}
            className="border-t p-2 px-4 border-t-gray-200 grid grid-rows-[1fr_auto] grid-cols-[30px_1fr_auto]"
          >
            <h1 className="text-md  row-span-2 self-center ">{category.id}</h1>
            <h1 className="text-md  row-span-2 self-center ">
              {category.name}
            </h1>

            <div className="flex gap-2 self-center row-span-2">
              {/* edit category dialog */}
              <EditCategory id={category.id} />

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
                      {category.name}'s account and remove data from our
                      servers.
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
      </div>
    </section>
  );
};

export default CategoryList;
