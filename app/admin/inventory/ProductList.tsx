"use client";
import { Categories, Product } from "@/lib/interfaces";
import React, { useEffect, useMemo, useState } from "react";
import ListHeader from "@/components/ListHeader";
import { AddProduct, EditProduct } from "./ProductDialog";
import { categorizedFilter, filterSearch } from "@/lib/utils";
import DropdownCategory from "@/components/DropdownCategory";
import ProductTable from "@/components/ProductTable";
import AdminProductRow from "./AdminProductRow";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationControl from "@/components/PaginationControl";
import { pageLimit } from "@/lib/constants";

const ProductList = () => {
  // search parameters
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // pagination current page and total pages
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // query data and loading state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);

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

      setProducts(resProduct.data.data);
      setTotalPage(resProduct.data.totalPage)
      setCategories(resCategories.data.categories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // filter product based on selected category
  const categorizedProducts: Product[] = useMemo(() => {
    try {
      return categorizedFilter(selectedCategory, safeProducts);
    } catch (error) {
      console.error("Error in categorizedFilter:", error);
      return safeProducts;
    }
  }, [selectedCategory, safeProducts]);

  // filter product based on search
  const filteredProducts: Product[] = useMemo(() => {
    try {
      return filterSearch(searchProduct, categorizedProducts);
    } catch (error) {
      console.error("Error in filterSearch:", error);
      return categorizedProducts;
    }
  }, [searchProduct, categorizedProducts]);

  try {
    return (
      <section className="h-[100vh] ">
        {/* header */}
        <ListHeader
          searchQuery={searchProduct}
          setSearchQuery={setSearchProduct}
          title={"Product"}
          AddDialog={<AddProduct categories={safeCategories} />}
        />

        {/* list */}
        <div className="space-y-2 mt-8 w-full max-w-8xl mx-auto card dark:border-gray-600">
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
              {/* categories */}
              <DropdownCategory
                className="bg-gray-100 text-gray-700 "
                title="Filter by category"
                categories={safeCategories}
                category={selectedCategory}
                setCategory={setSelectedCategory}
              />

              {/* product table */}
              <ProductTable
                products={filteredProducts}
                tableHeads={[
                  "Product",
                  "Status",
                  "Price",
                  "Stock",
                  "Total Sales",
                  "Revenue",
                  "Created At",
                  "Settings",
                ]}
                tableRow={(product: Product, index: number) => (
                  <AdminProductRow
                    key={index}
                    product={product}
                    categories={safeCategories}
                  />
                )}
              />
            </>
          )}
        </div>

        <PaginationControl toalPage={totalPage} page={page} setPage={setPage} />
      </section>
    );
  } catch (error) {
    console.error("Error rendering ProductList:", error);
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Error Loading Products
        </h2>
        <p className="text-gray-600">
          Something went wrong while loading the products. Please try refreshing
          the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }
};

export default ProductList;
