"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import RefreshButton from "./RefreshButton";
import { Search } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;

  title: string;

  AddDialog: React.ReactElement;
}

export const useDebounced = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const ListHeader = ({
  searchQuery,
  setSearchQuery,
  title,
  AddDialog,
}: Props) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedQuery = useDebounced(inputValue, 1000);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <div className="flex items-center justify-between px-4 py-2 gap-2">
      <h1 className="font-medium text-2xl">{title} List</h1>

      {AddDialog}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Search ${title}....`}
          className="max-w-sm pl-8"
        />
      </div>
      <RefreshButton />
    </div>
  );
};

export default ListHeader;
