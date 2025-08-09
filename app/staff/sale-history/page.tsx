import { useUser } from "@/app/Context/UserContext";
import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import { includes } from "zod/v4";
import SaleHistoryList from "./SaleHistoryList";

const page = async () => {
  const user = await getCurrentUser();
  const saleItems: any = await prisma.saleItem.findMany({
    where: {
      sale: {
        userId: user?.id,
      },
    },
    include: {
      product: true,
      sale: {
        select: {
          id: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      sale: {
        createdAt: "desc",
      },
    },
  });


  console.log(saleItems);

  return (
    <Suspense fallback={<>Wait lang</>}>
      <SaleHistoryList saleHistoy={saleItems} />
    </Suspense>
  );
};

export default page;
