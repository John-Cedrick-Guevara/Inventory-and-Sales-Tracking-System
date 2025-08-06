"use client";
import { Categories, Product } from "@/lib/interfaces";
import React, { useMemo, useState } from "react";
import ListHeader from "@/components/ListHeader";
import { AddProduct, EditProduct } from "./ProductDialog";
import { categorizedFilter, filterSearch } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import axios from "axios";
import AlertDeleteDialog from "@/components/AlertDialog";
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
    <section>
      {/* header */}
      <ListHeader
        searchQuery={searchProduct}
        setSearchQuery={setSearchProduct}
        title={"Product"}
        AddDialog={<AddProduct categories={categories} />}
      />

      {/* list */}
      <div className="space-y-2 mt-8 w-full max-w-8xl mx-auto">
        {/* categories */}
        <DropdownCategory
          className="bg-gray-100 text-gray-700 "
          title="Filter by category"
          categories={categories}
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
              categories={categories}
            />
          )}
        />
      </div>
    </section>
  );
};

export default ProductList;
