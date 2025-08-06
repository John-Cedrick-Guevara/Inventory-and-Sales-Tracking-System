import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Categories } from "@/lib/interfaces";
import prisma from "@/lib/prisma";

interface Props {
  categories: Categories[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  title?: string;
}

const DropdownCategory = ({
  categories,
  category,
  setCategory,
  className,
  title = "Categories",
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className} asChild>
        <Button variant="outline">
          {category
            ? categories.find((item) => item.id === Number(category))?.name
            : title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={String(category)}
          onValueChange={(e) => setCategory((prev) => (prev === e ? "" : e))}
        >
          {categories.map((category, index) => (
            <DropdownMenuRadioItem key={index} value={String(category.id)}>
              {category.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownCategory;
