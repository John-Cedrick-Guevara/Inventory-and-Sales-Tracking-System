"use client";
import { Categories, Product } from "@/lib/interfaces";
import React, { useMemo, useState } from "react";
import ListHeader from "@/components/ListHeader";
import { AddProduct, EditProduct } from "./ProductDialog";
import { categorizedFilter, filterSearch } from "@/lib/utils";
import DropdownCategory from "@/components/DropdownCategory";
import ProductTable from "@/components/ProductTable";
import AdminProductRow from "./AdminProductRow";

const ProductList = ({
  products,
  categories,
}: {
  products: Product[];
  categories: Categories[];
}) => {
  // search parameters
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Safety check for products and categories
  const safeProducts = products || [];
  const safeCategories = categories || [];


  const categorizedProducts: Product[] = useMemo(() => {
    try {
      return categorizedFilter(selectedCategory, safeProducts);
    } catch (error) {
      console.error("Error in categorizedFilter:", error);
      return safeProducts;
    }
  }, [selectedCategory, safeProducts]);

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
      <section>
        {/* header */}
        <ListHeader
          searchQuery={searchProduct}
          setSearchQuery={setSearchProduct}
          title={"Product"}
          AddDialog={<AddProduct categories={safeCategories} />}
        />

        {/* list */}
        <div className="space-y-2 mt-8 w-full max-w-8xl mx-auto">
          {/* categories */}
          <DropdownCategory
            className="bg-gray-100 text-gray-700 "
            title="Filter by category"
            categories={safeCategories}
            category={selectedCategory}
            setCategory={setSelectedCategory}
          />
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
        </div>
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
