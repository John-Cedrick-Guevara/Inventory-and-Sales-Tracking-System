"use client";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const RefreshButton = () => {
  const path = usePathname();
  
  return (
    <Link href={path}>
      <RefreshCcw
        width={30}
        height={30}
        className="cursor-pointer bg-blue-700 text-white p-1 rounded-md"
      />
    </Link>
  );
};

export default RefreshButton;
