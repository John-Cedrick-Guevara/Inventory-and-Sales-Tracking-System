"use client";
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
import { PencilLine, Trash } from "lucide-react";
import IconButton from "./IconButton";

import {
  Categories,
  editUserCredentials,
  UserCredentials,
  Users,
} from "@/lib/interfaces";

interface Props<T> {
  // table head, datas, and title
  tableHead: string[];
  tableItems: (keyof T)[];
  data: T[];
  title: string;

  // handles delete and edit of user
  renderActions?: (row: T) => React.ReactNode;
}

const TableComponent = <T,>({
  title,
  tableHead,
  tableItems,
  data,
  renderActions,
}: Props<T>) => {
  return (
    <main>
      <Table>
        <TableCaption>{title}</TableCaption>
        <TableHeader>
          <TableRow>
            {tableHead.map((head, index) => (
              <TableHead key={index}>{head}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {tableItems.map((key, colIndex) => (
                <TableCell key={colIndex}>{String(item[key])}</TableCell>
              ))}
              {renderActions && (
                <TableCell className="flex items-center gap-2">
                  {renderActions(item)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default TableComponent;
