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
import { SaleItem } from "@/lib/generated/prisma";

interface Props<T> {
  sales: T[];
  tableHeads: string[];
  tableRow: (sale: T, index: number) => React.ReactNode;
}

const SalesHistoryTable = <T,>({ sales, tableHeads, tableRow }: Props<T>) => {
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
          {sales && sales.length > 0 ? (
            sales.map((sale, index) => tableRow(sale, index))
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

export default SalesHistoryTable;
