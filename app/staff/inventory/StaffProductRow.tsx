import AlertDeleteDialog from "@/components/AlertDialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Categories, Product } from "@/lib/interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import AddSaleDialog from "./AddSaleDialog";

const StaffProductRow = ({
  product,
  categories,
}: {
  product: Product;
  categories: Categories[];
}) => {
  const base64 = Buffer.from(product.image).toString("base64");
  const dataUrl = `data:image/png;base64,${base64}`;
  const status = "Published";

  return (
    <TableRow>
      <TableCell className="font-medium  text-left flex items-center gap-2">
        <img
          src={dataUrl}
          alt="product-image"
          className="object-contain row-span-2 aspect-square w-14 border"
        />
        <h1 className="self-center text-lg">{product.name}</h1>
      </TableCell>
      <TableCell>
        <h3 className="text-sm mx-auto text-gray-500 bg-gray-100 w-fit rounded-md p-1">
          {product.category?.name}
        </h3>
      </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.stock}</TableCell>

      <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <AddSaleDialog
          className={"bg-blue-100 text-blue-700 p-2 hover:bg-blue-200 mx-auto"}
          id={product.id}
          name={product.name}
          price={product.price}
        />
      </TableCell>
    </TableRow>
  );
};

export default StaffProductRow;
