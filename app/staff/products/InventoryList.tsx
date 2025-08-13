"use client";
import ListHeader from "@/components/ListHeader";
import ProductTable from "@/components/ProductTable";
import { AddSaleQueItem, Categories, Product } from "@/lib/interfaces";
import { categorizedFilter, filterSearch } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import StaffProductRow from "./StaffProductRow";
import AddSaleDialog from "./AddSaleDialog";
import DropdownCategory from "@/components/DropdownCategory";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { pageLimit } from "@/lib/constants";
import PaginationControl from "@/components/PaginationControl";

const InventoryList = () => {
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addSaleQue, setAddSaleQue] = useState<AddSaleQueItem[]>([]);
  // query data and loading state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);

  // pagination current page and total pages
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // Safety check for products and categories
  const safeProducts = products || [];
  const safeCategories = categories || [];

  async function fetchProducts() {
    try {
      setLoading(true);

      const resProduct = await axios.get(
        `/api/products?limit=${pageLimit}&page=${page}`
      );
      const resCategories = await axios.get("/api/categories");

      setTotalPage(resProduct.data.totalPage);
      setProducts(resProduct.data.data);
      setCategories(resCategories.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page]);
  const categorizedProducts: Product[] = useMemo(
    () => categorizedFilter(selectedCategory, products),
    [selectedCategory, categories]
  );

  const filteredProducts: Product[] = useMemo(
    () => filterSearch(searchProduct, categorizedProducts),
    [searchProduct, categorizedProducts]
  );

  return (
    <section className="h-[100vh]">
      {/* header */}
      <ListHeader
        searchQuery={searchProduct}
        setSearchQuery={setSearchProduct}
        title={"Product"}
      />
      <div className="space-y-2 mt-8 w-full max-w-8xl mx-auto">
        {/* list */}
        {loading ? (
          <>
            {/* Dropdown skeleton */}
            <Skeleton className="h-10 w-60 bg-gray-200" />

            {/* Table skeleton */}
            <div className="mt-4">
              {/* Table head skeleton */}
              <div className="flex gap-4 border-b pb-2">
                <Skeleton className="h-40 w-full bg-gray-200" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              {/* categories */}
              <DropdownCategory
                className="bg-gray-100 text-gray-700 "
                title="Filter by category"
                categories={safeCategories}
                category={selectedCategory}
                setCategory={setSelectedCategory}
              />

              {/* add sale dialog */}
              {addSaleQue.length > 0 && (
                <div className="relative w-fit ">
                  <h1 className="absolute -right-2 -top-2 border border-white bg-blue-800 text-white text-sm font-semibold rounded-2xl px-2 pb-1 h-6">
                    {addSaleQue.length}
                  </h1>
                  <AddSaleDialog
                    setSaleQue={setAddSaleQue}
                    saleQue={addSaleQue}
                  />
                </div>
              )}
            </div>

            {/* Product List */}
            <div className="min-h-60">
              <ProductTable
                products={filteredProducts}
                tableHeads={[
                  "Product",
                  "Category",
                  "Price",
                  "Stock",
                  "Date Created",
                  "Actions",
                ]}
                tableRow={(product: Product, index: number) => (
                  <StaffProductRow
                    saleQue={addSaleQue}
                    setSaleQue={setAddSaleQue}
                    key={index}
                    product={product}
                  />
                )}
              />
            </div>
          </>
        )}
      </div>

      <PaginationControl toalPage={totalPage} page={page} setPage={setPage} />
    </section>
  );
};

export default InventoryList;
