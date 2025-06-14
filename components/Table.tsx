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
import { CircleArrowLeft, LucideIcon, PencilLine, Trash } from "lucide-react";
import IconButton from "./IconButton";
import UserForm from "./UserForm";
import { UserCredentials } from "@/lib/interfaces";

interface Props<T> {
  // table head, datas, and title
  tableHead: string[];
  tableItems: (keyof T)[];
  data: T[];
  title: string;

  // add items icon and function
  canAdd: boolean;
  AddIcon?: LucideIcon;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;

  // form component and form showState
  FormComponent: React.FC<FormProps>;
  showForm: boolean;
  setShowForm: (val: boolean) => void;

  // item credentials
  credentials: UserCredentials;
  setCredentials: React.Dispatch<React.SetStateAction<UserCredentials>>;
}

interface FormProps {
  // item credentials
  credentials: UserCredentials;
  setCredentials: React.Dispatch<React.SetStateAction<UserCredentials>>;

  // form showState and function
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const TableComponent = <T,>({
  title,
  tableHead,
  tableItems,
  data,
  canAdd,
  AddIcon,
  FormComponent,
  handleSignUp,
  setShowForm,
  showForm,
  credentials,
  setCredentials,
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
              <TableCell className=" flex items-center gap-2">
                <IconButton
                  IconButton={PencilLine}
                  tooltip={"Edit Credentials"}
                  variant={"default"}
                />
                <IconButton
                  IconButton={Trash}
                  tooltip={"Delete User"}
                  variant={"destructive"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* add form and icon */}
      <div
        className=" fixed bottom-10 w-full z-40"
        onClick={() => setShowForm(true)}
      >
        <IconButton
          variant="outline"
          IconButton={AddIcon}
          tooltip={"Add user"}
        />
      </div>
      <div
        className={`w-full scale-0 h-full absolute top-0 right-0 flex items-center justify-center mx-auto transition-all  z-30 ${
          showForm && "scale-100  bg-white/70"
        }`}
      >
        {/* cancel Icon */}
        <div className="w-lg relative ">
          <div
            onClick={() => setShowForm(false)}
            className="absolute top-5 left-5"
          >
            <IconButton
              text="Cancel"
              tooltip={""}
              IconButton={CircleArrowLeft}
              variant={"outline"}
            />
          </div>

          <FormComponent
            handleSignUp={handleSignUp}
            showForm={showForm}
            setShowForm={setShowForm}
            credentials={credentials}
            setCredentials={setCredentials}
          />
        </div>
      </div>
    </main>
  );
};

export default TableComponent;
