"use client";
import { Categories } from "@/lib/interfaces";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ListHeader from "@/components/ListHeader";
import { AddCategory, EditCategory } from "./CategoryDialog";
import { filterSearch } from "@/lib/utils";
import AlertDeleteDialog from "@/components/AlertDialog";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { pageLimit } from "@/lib/constants";
import PaginationControl from "@/components/PaginationControl";

export const CategoryList = () => {
  // search parameters
  const [searchCategory, setSearchCategory] = useState("");

  // date
  const [categories, setCategories] = useState([]);

  // loading query
  const [loading, setLoading] = useState(true);

  // pagination current page and total pages
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // fetcher
  const fetchCategories = async () => {
    const res = await axios.get(
      `/api/categories?limit=${pageLimit}&page=${page}`
    );

    setCategories(res.data.data);
    setTotalPage(res.data.totalPage);
    setLoading(false);
  };
  
  // fetcher call
  useEffect(() => {
    fetchCategories();
  }, [page]);

  // data filtration
  const filteredCategories: Categories[] = useMemo(
    () => filterSearch(searchCategory, categories),
    [searchCategory, categories]
  );

  // delete function
    async function handleDeleteCategory(id: number | undefined) {
    try {
      await axios.delete(`/api/categories/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="h-[100vh]">
      {/* header(search and add dialog) */}
      <ListHeader
        searchQuery={searchCategory}
        setSearchQuery={setSearchCategory}
        title={"Category"}
        AddDialog={<AddCategory />}
      />

      {/* list */}
      <div className="rounded-xl border border-gray-200 shadow-sm mt-8 dark:bg-gray-800">
        {/* title */}
        <div className="p-2 px-4">
          <h1 className="text-lg font-medium">Categories</h1>
        </div>
        {loading ? (
          <div className="p-2">
            <Skeleton className="h-[100px] "></Skeleton>
          </div>
        ) : (
          filteredCategories?.map((category, index) => (
            <CategoryListRow category={category} key={index} handleDeleteCategory={handleDeleteCategory}/>
          ))
        )}
      </div>

      <PaginationControl toalPage={totalPage} page={page} setPage={setPage} />
    </section>
  );
};

// category row
export function CategoryListRow({ category, handleDeleteCategory }: { category: Categories; handleDeleteCategory : (id: number | undefined) => void }) {
  // delete function


  return (
    <div className="border-t p-2 px-4 border-t-gray-200 grid grid-rows-[1fr_auto] grid-cols-[30px_1fr_auto]">
      <h1 className="text-md  row-span-2 self-center ">{category.id}</h1>
      <h1 className="text-md  row-span-2 self-center ">{category.name}</h1>

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
  );
}
