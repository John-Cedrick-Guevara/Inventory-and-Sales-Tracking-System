import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationControl = ({
  page,
  setPage,
  toalPage,
}: {
  toalPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Pagination className="mt-10 p-1 bg-gray-100 dark:bg-gray-700 w-fit rounded-md border">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="hover:dark:bg-gray-500 "
            href="#"
            onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{page}</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            className="hover:dark:bg-gray-500"
            href="#"
            onClick={() =>
              setPage((prev) => (prev < toalPage ? prev + 1 : prev))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControl;
