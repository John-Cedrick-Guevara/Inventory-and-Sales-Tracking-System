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

import { editUserCredentials, UserCredentials, Users } from "@/lib/interfaces";

interface Props<T> {
  // table head, datas, and title
  tableHead: string[];
  tableItems: (keyof T)[];
  data: T[];
  title: string;

  // item credentials
  credentials: editUserCredentials;
  setCredentials: React.Dispatch<React.SetStateAction<editUserCredentials>>;

  // edit form state
  showForm: boolean;
  setShowForm: (val: boolean) => void;

  // delete item function
  deleteItem: (id: number) => Promise<true | undefined>;
}

const TableComponent = <T extends Users>({
  title,
  tableHead,
  tableItems,
  data,
  credentials,
  setCredentials,
  showForm,
  setShowForm,
  deleteItem,
}: Props<T>) => {
  function getToEditUser(user: editUserCredentials) {
    setCredentials(user);
    setShowForm(true);
  }

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
              <TableCell className=" flex items-center gap-2">
                {/* edit icon */}
                <div onClick={() => getToEditUser(item)}>
                  <IconButton
                    IconButton={PencilLine}
                    tooltip={"Edit Credentials"}
                    variant={"default"}
                  />
                </div>

                {/* delete icon */}
                <div onClick={() => deleteItem(item.id)}>
                  <IconButton
                    IconButton={Trash}
                    tooltip={"Delete User"}
                    variant={"destructive"}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default TableComponent;
