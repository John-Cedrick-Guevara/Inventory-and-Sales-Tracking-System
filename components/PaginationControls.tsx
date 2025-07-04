"use client";
import { GetUser } from "@/lib/interfaces";
import React from "react";

interface Props {
  data: GetUser | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

const PaginationControls = ({ data, setPage, page }: Props) => {
  return (
    <div className="flex items-center gap-4 absolute mx-auto left-0 right-0 bottom-10 w-fit">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      <span>
        Page {data?.currentPage} of {data?.totalPages}
      </span>

      <button
        onClick={() =>
          setPage((prev) =>
            data?.totalPages ? Math.min(prev + 1, data.totalPages) : prev + 1
          )
        }
        disabled={page === data?.totalPages}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
