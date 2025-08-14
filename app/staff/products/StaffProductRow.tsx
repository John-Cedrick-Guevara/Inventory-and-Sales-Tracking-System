import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { AddSaleQueItem, Product } from "@/lib/interfaces";

import React from "react";

const StaffProductRow = ({
  product,
  setSaleQue,
}: {
  product: Product;
  setSaleQue: React.Dispatch<React.SetStateAction<AddSaleQueItem[]>>;
}) => {
  // adds the product to sale que
  function addToSaleQue(product: AddSaleQueItem) {
    setSaleQue((prev) => {
      const existing = prev?.find((item) => item.id === product.id); // checks for product existence

      // adds to the saleQue if the product doesn't exist
      if (!existing) {
        return [...prev, { ...product }];
      }

      // if existing update the quantity and subtotal
      else {
        return prev.map((item) => {
          if (item.id === product.id) {
            const newQuantity =
              item.productStock > item.quantity
                ? (item.quantity ?? 1) + 1
                : item.quantity;
            return {
              ...item,
              quantity: newQuantity,
              subTotal: newQuantity * item.price,
            };
          }
          return item;
        });
      }
    });
  }

  return (
    <TableRow>
      {/* product image, name */}
      <TableCell className="font-medium  text-left flex items-center gap-2">
        {/* product image */}
        <img
          loading="lazy"
          src={product.image}
          alt="product-image"
          className="object-contain row-span-2 aspect-square w-14 border"
        />
        {/* product name */}
        <h1 className="self-center text-lg">{product.name}</h1>
      </TableCell>

      {/* product category */}
      <TableCell>
        <h3 className="text-sm mx-auto text-gray-500 bg-gray-100 w-fit rounded-md p-1">
          {product.category?.name}
        </h3>
      </TableCell>

      {/* product price */}
      <TableCell>${product.price.toLocaleString()}</TableCell>

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

      {/* product date created */}
      <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>

      {/* add to sale que button */}
      <TableCell>
        <Button
          disabled={product.stock <= 0}
          onClick={() => {
            const { id, name, price, category, image, stock } = product;
            addToSaleQue({
              id,
              name,
              price,
              category,
              image,
              subTotal: price,
              quantity: 1,
              productStock: stock,
            });
          }}
          className="bg-blue-100 text-blue-700 w-fit p-2 rounded-md mx-auto hover:bg-blue-200 hover: hover:text-blue-800 cursor-pointer"
        >
          Add to sale que
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default StaffProductRow;
