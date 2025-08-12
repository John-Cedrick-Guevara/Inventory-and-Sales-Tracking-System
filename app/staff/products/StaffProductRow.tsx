import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { AddSaleQueItem, Categories, Product } from "@/lib/interfaces";

import React from "react";

const StaffProductRow = ({
  product,
  saleQue,
  setSaleQue,
}: {
  product: Product;
  saleQue: AddSaleQueItem[];
  setSaleQue: React.Dispatch<React.SetStateAction<AddSaleQueItem[]>>;
}) => {
  function addToSaleQue(product: AddSaleQueItem) {
    setSaleQue((prev) => {
      const existing = prev?.find((item) => item.id === product.id);

      if (!existing) {
        return [...prev, { ...product }];
      } else {
        return prev.map((item) => {
          if (item.id === product.id) {
            const newQuantity = (item.quantity ?? 1) + 1;
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
    console.log(saleQue);
  }

  return (
    <TableRow>
      <TableCell className="font-medium  text-left flex items-center gap-2">
        <img
          src={product.image}
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

      <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <Button
        disabled={product.stock <=0}
          onClick={() => {
            const { id, name, price, category, image } = product;
            addToSaleQue({
              id,
              name,
              price,
              category,
              image,
              subTotal: price,
              quantity: 1,
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
