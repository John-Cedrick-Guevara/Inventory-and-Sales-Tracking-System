"use client";
import { Categories } from "@/lib/interfaces";
import React, { useMemo, useState } from "react";
import axios from "axios";
import ListHeader from "@/components/ListHeader";
import { AddCategory, EditCategory } from "./CategoryDialog";
import { filterSearch } from "@/lib/utils";
import AlertDeleteDialog from "@/components/AlertDialog";
import { Trash2 } from "lucide-react";

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
              <AlertDeleteDialog
                label={
                  <Trash2
                    width={35}
                    height={35}
                    className="bg-red-100 text-red-700 p-1 rounded-md cursor-pointer"
                  />
                }
                name={category.name}
                deleteFunction={() => handleDeleteCategory(category.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
