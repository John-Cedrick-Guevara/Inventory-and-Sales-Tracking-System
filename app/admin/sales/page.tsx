import SalesHistoryTable from "@/components/SaleHistoryTable";
import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import { includes } from "zod/v4";
import SaleHistoryList from "./SaleHistoryList";
import { SaleItem } from "@/lib/generated/prisma";

const page = async () => {
  const saleHistory: any = await prisma.saleItem.findMany({
    include: {
      product: {
        select: {
          name: true,
          price: true,
        },
      },
      sale: {
        select: {
          createdAt: true,
          id: true,

          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  console.log(saleHistory);

  return (
    <Suspense fallback={<>WQait lang</>}>
      <SaleHistoryList saleHistory={saleHistory} />
    </Suspense>
  );
};

export default page;
