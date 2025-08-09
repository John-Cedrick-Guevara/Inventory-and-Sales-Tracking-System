import AlertDeleteDialog from "@/components/AlertDialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Categories, Product } from "@/lib/interfaces";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import React from "react";
import { EditProduct } from "./ProductDialog";
import axios from "axios";

export function AdminProductRow({
  product,
  categories,
}: {
  product: Product;
  categories: Categories[];
}) {
  const status = "Published";

  // Debug logging
  console.log(product);

  // Safety check for product
  if (!product) {
    return (
      <TableRow>
        <TableCell colSpan={8} className="text-center text-gray-500">
          Invalid product data
        </TableCell>
      </TableRow>
    );
  }

  // console.log(product)

  async function handleDeleteProduct(id: number | undefined) {
    try {
      await axios.delete(`/api/products/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <TableRow>
      <TableCell className="font-medium grid gap-1 grid-rows-2 grid-cols-[auto_1fr] text-left">
        <img
          src={product.image || "/placeholder-image.png"}
          alt="product-image"
          className="object-contain row-span-2 aspect-square w-14 border"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-image.png";
          }}
        />
        <h1 className="self-center text-lg">
          {product.name || "Unnamed Product"}
        </h1>
        <h3 className="self-center text-sm text-gray-500 bg-gray-100 w-fit rounded-md p-1">
          {product.category?.name || "No Category"}
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
      <TableCell>{product.price || 0}</TableCell>
      <TableCell>{product.stock || 0}</TableCell>
      <TableCell>-</TableCell>
      <TableCell>-</TableCell>
      <TableCell>
        {product.createdAt
          ? new Date(product.createdAt).toLocaleDateString()
          : "N/A"}
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
            <DropdownMenuItem asChild>
              <AlertDeleteDialog
                className="hover:bg-red-100 hover:text-red-700 w-full"
                label={"Delete"}
                name={product.name}
                deleteFunction={() => handleDeleteProduct(product.id)}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default AdminProductRow;
