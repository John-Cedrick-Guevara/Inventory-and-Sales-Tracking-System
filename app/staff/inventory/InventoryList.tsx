"use client";
import ListHeader from "@/components/ListHeader";
import ProductTable from "@/components/ProductTable";
import { Categories, Product } from "@/lib/interfaces";
import { categorizedFilter, filterSearch } from "@/lib/utils";
import React, { useMemo, useState } from "react";
import StaffProductRow from "./StaffProductRow";

const InventoryList = ({
  products,
  categories,
}: {
  products: Product[];
  categories: Categories[];
}) => {
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categorizedProducts: Product[] = useMemo(
    () => categorizedFilter(selectedCategory, products),
    [selectedCategory, categories]
  );

  console.log(categorizedProducts);

  const filteredProducts: Product[] = useMemo(
    () => filterSearch(searchProduct, categorizedProducts),
    [searchProduct, categorizedProducts]
  );
  return (
    <>
      {/* header */}
      <ListHeader
        searchQuery={searchProduct}
        setSearchQuery={setSearchProduct}
        title={"Product"}
      />

      {/* Product List */}
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
            key={index}
            product={product}
            categories={categories}
          />
        )}
      />
    </>
  );
};

export default InventoryList;
