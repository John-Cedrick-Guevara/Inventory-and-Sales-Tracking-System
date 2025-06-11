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
  tableHead: string[];
  tableItems: (keyof T)[];
  data: T[];
  title: string;
}

const TableComponent = <T,>({
  title,
  tableHead,
  tableItems,
  data,
}: Props<T>) => {
  return (
    <Table>
      <TableCaption>{title}</TableCaption>
      <TableHeader>
        <TableRow>
          {tableHead.map((head, index) => (
            <TableHead key={index}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            {tableItems.map((key, colIndex) => (
              <TableCell key={colIndex}>{String(item[key])}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
