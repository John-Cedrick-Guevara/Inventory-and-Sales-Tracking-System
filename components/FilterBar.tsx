"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  searchItem: string;
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
}

const FilterBar = ({
  searchItem,
  setSearchItem,
  selectedCategory,
  setSelectedCategory,
  categories,
}: Props) => {
  return (
    <div>
      <div className="flex items-center justify-end gap-2 my-4">
        {/* search bar */}
        <Input
          className="max-w-sm"
          value={searchItem}
          type="email"
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search product..."
        />

        {/* dropdown category */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedCategory ? selectedCategory : "Select Category"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <DropdownMenuRadioItem value={""}>See all</DropdownMenuRadioItem>
              {categories.map((item, index) => (
                <DropdownMenuRadioItem key={index} value={item}>
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterBar;
