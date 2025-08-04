"use client";
import { Categories, Product } from "@/lib/interfaces";
import React, { useMemo, useState } from "react";
import ListHeader from "@/components/ListHeader";
import { AddProduct, EditProduct } from "./ProductDialog";
import { filterSearch } from "@/lib/utils";
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

const ProductList = ({
  products,
  categories,
}: {
  products: Product[];
  categories: Categories[];
}) => {
  const [searchProduct, setSearchProduct] = useState("");

  console.log(products);

  const filteredProducts: Product[] = useMemo(
    () => filterSearch(searchProduct, products),
    [searchProduct, products]
  );

  async function handleDeleteProduct(id: number | undefined) {
    try {
      await axios.delete(`/api/products/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

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
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[320px] text-left">Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total Sales</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Settings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product, index) => {
              const base64 = Buffer.from(product.image).toString("base64");
              const dataUrl = `data:image/png;base64,${base64}`;
              const status = "Published";
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium grid gap-1 grid-rows-2 grid-cols-[auto_1fr] text-left">
                    <img
                      src={dataUrl}
                      alt="product-image"
                      className="object-fill row-span-2 aspect-square w-14 border"
                    />
                    <h1 className="self-center text-lg">{product.name}</h1>
                    <h3 className="self-center text-sm text-gray-500 bg-gray-100 w-fit rounded-md p-1">
                      {product.category?.name}
                    </h3>
                  </TableCell>
                  <TableCell>
                    <h1
                      className={`mx-auto h-fit w-fit p-2 rounded-md ${
                        status === "Published"
                          ? "bg-green-100 text-green-600"
                          : status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      } `}
                    >
                      {status}
                    </h1>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Ellipsis className="mx-auto cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <EditProduct
                            className="hover:bg-blue-100 hover:text-blue-700 w-full p-2"
                            categories={categories}
                            id={product.id}
                          />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => handleDeleteProduct(product.id)}
                          className="hover:bg-red-100 hover:text-red-700"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ProductList;
