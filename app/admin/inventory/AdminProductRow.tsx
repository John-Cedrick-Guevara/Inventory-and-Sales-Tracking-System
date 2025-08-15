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

export function AdminProductRow({
  product,
  categories,
  handleDeleteProduct,
}: {
  product: Product;
  categories: Categories[];
  handleDeleteProduct: (id: number | undefined) => void;
}) {
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

  return (
    <TableRow>
      {/* product image, name, category */}
      <TableCell className="font-medium grid gap-1 grid-rows-2 grid-cols-[auto_1fr] text-left">
        {/* image */}
        <img
          src={product.image || "/placeholder-image.png"}
          loading="lazy"
          alt="product-image"
          className="object-contain row-span-2 aspect-square w-14 border"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-image.png";
          }}
        />

        {/* name */}
        <h1 className="self-center text-lg">
          {product.name || "Unnamed Product"}
        </h1>

        {/* category */}
        <h3 className="self-center text-xs text-gray-500 bg-gray-100 w-fit rounded-md p-1">
          {product.category?.name || "No Category"}
        </h3>
      </TableCell>

      {/* product status */}
      <TableCell>
        <h1
          className={`mx-auto h-fit w-fit p-2 rounded-md ${
            product.status === "published"
              ? "bg-green-100 text-green-600"
              : product.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          } `}
        >
          {product.status}
        </h1>
      </TableCell>

      {/* product price */}
      <TableCell>{product.price || 0}</TableCell>

      {/* product stock */}
      <TableCell>
        <h1
          className={`py-1 px-3 mx-auto font-semibold w-fit rounded-xl ${
            product.stock >= 10
              ? "bg-green-100 text-green-700"
              : product.stock <= 5
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.stock || 0}
        </h1>
      </TableCell>

      {/* product quantity sold */}
      <TableCell>{product.saleItems?.length}</TableCell>

      {/* product total revenue */}
      <TableCell>
        $
        {product.saleItems
          ?.reduce((total, current) => total + current.subtotal, 0)
          .toLocaleString()}
      </TableCell>

      {/* product created date */}
      <TableCell>
        {product.createdAt
          ? new Date(product.createdAt).toLocaleDateString()
          : "N/A"}
      </TableCell>

      {/* product action */}
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
