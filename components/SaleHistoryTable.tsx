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
  sales: T[];
  tableHeads: string[];
  tableRow: (sale: T, index: number) => React.ReactNode;
}

const SalesHistoryTable = <T,>({ sales, tableHeads, tableRow }: Props<T>) => {
  return (
    <section className="min-h-60">
      <Table className="mt-8 shadow-none table-auto">
        <TableHeader className="dark:bg-gray-800">
          <TableRow >
            {tableHeads.map((item, index) => {
              return <TableHead key={index}>{item}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="border-none">
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
    </section>
  );
};

export default SalesHistoryTable;
