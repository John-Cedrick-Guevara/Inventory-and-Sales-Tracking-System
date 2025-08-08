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


interface Props<T> {
  products: T[];
  tableHeads: string[];
  tableRow: (item: T, index: number) => React.ReactNode;
}

const ProductTable = <T,>({ products, tableHeads, tableRow }: Props<T>) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeads.map((item, index) => {
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
