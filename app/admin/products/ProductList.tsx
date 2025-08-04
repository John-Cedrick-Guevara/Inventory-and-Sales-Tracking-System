"use client";
import { Categories, Product } from "@/lib/interfaces";
import React, { useState } from "react";
import ListHeader from "@/components/ListHeader";
import { AddProduct } from "./ProductDialog";

const ProductList = ({
  products,
  categories,
}: {
  products: Product[];
  categories: Categories[];
}) => {
  const [searchProduct, setSearchProduct] = useState("");

  return (
    <section>
      {/* header */}
      <ListHeader
        searchQuery={searchProduct}
        setSearchQuery={setSearchProduct}
        title={"Product"}
        AddDialog={<AddProduct categories={categories} />}
      />

      {/* list */}
      <div></div>
    </section>
  );
};

export default ProductList;
