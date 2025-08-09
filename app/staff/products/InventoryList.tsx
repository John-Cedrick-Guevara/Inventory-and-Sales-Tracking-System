"use client";
import ListHeader from "@/components/ListHeader";
import ProductTable from "@/components/ProductTable";
import { AddSaleQueItem, Categories, Product } from "@/lib/interfaces";
import { categorizedFilter, filterSearch } from "@/lib/utils";
import React, { useMemo, useState } from "react";
import StaffProductRow from "./StaffProductRow";
import AddSaleDialog from "./AddSaleDialog";

const InventoryList = ({
  products,
  categories,
}: {
  products: Product[];
  categories: Categories[];
}) => {
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addSaleQue, setAddSaleQue] = useState<AddSaleQueItem[]>([]);

  const categorizedProducts: Product[] = useMemo(
    () => categorizedFilter(selectedCategory, products),
    [selectedCategory, categories]
  );

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
      <div className="space-y-2 mt-8 w-full max-w-8xl mx-auto">
        {/* add sale dialog */}
        {addSaleQue.length > 0 && (
          <div className="relative w-fit">
            <h1 className="absolute -right-2 -top-2 border border-white bg-blue-800 text-white text-sm font-semibold rounded-2xl px-2 pb-1 h-6">
              {addSaleQue.length}
            </h1>
            <AddSaleDialog setSaleQue={setAddSaleQue} saleQue={addSaleQue} />
          </div>
        )}
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
              saleQue={addSaleQue}
              setSaleQue={setAddSaleQue}
              key={index}
              product={product}
            />
          )}
        />
      </div>
    </>
  );
};

export default InventoryList;
