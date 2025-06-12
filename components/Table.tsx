"use client";
import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LucideIcon } from "lucide-react";
import IconButton from "./IconButton";
import AddUserForm from "./AddUserForm";

interface Props<T> {
  tableHead: string[];
  tableItems: (keyof T)[];
  data: T[];
  title: string;
  canAdd: boolean;
  AddIcon?: LucideIcon;
  addFunction?: () => void;
}

const TableComponent = <T,>({
  title,
  tableHead,
  tableItems,
  data,
  canAdd,
  AddIcon,
}: Props<T>) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <main>
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

      {/* add form and icon */}
      <div
        className=" fixed bottom-10 w-full z-40"
        onClick={() => setShowForm((prev) => !prev)}
      >
        <IconButton IconButton={AddIcon} tooltip={"Add user"} />
      </div>

      <AddUserForm showForm={showForm} />
    </main>
  );
};

export default TableComponent;
