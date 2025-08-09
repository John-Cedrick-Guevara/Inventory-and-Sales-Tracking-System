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
          {products && products.length > 0 ? (
            products.map((product, index) => tableRow(product, index))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableHeads.length}
                className="text-center py-8 text-gray-500"
              >
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
