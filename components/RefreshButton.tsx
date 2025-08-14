"use client";
import { RefreshCcw } from "lucide-react";
import React from "react";

const RefreshButton = () => {
  return (
    <button
      onClick={() => window.location.reload()}
      className="cursor-pointer bg-blue-700 text-white p-1 rounded-md"
    >
      <RefreshCcw width={30} height={30} />
    </button>
  );
};

export default RefreshButton;
