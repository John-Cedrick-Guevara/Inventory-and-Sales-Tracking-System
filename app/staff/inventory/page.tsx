import ListHeader from "@/components/ListHeader";

import React, { Suspense } from "react";
import InventoryList from "./InventoryList";
import prisma from "@/lib/prisma";

const page = async () => {
  const products: any = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  const categories: any = await prisma.category.findMany();

  return (
    <Suspense fallback={<>Mag Hintay Ka Kupal!!</>}>
      <InventoryList products={products} categories={categories} />
    </Suspense>
  );
};

export default page;
