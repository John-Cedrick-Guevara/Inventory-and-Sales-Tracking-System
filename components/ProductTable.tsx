import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/interfaces";

interface Props {
  products: Product[];
  tableHeads: string[];
  tableRow: (product: Product, index: number) => React.ReactNode;
}

const ProductTable = ({ products, tableHeads, tableRow }: Props) => {
  return (
    <div >
      <Table >
        <TableHeader>
          <TableRow>
            {tableHeads.map((item, index) => {
              console.log(item, index);
              return (
                <TableHead
                  key={index}
                  className={`${
                    index === 0 ? "w-[320px] text-left" : "text-center"
                  } `}
                >
                  {item}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => tableRow(product, index))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
