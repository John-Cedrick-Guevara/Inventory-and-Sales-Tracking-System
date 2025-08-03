import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import ProductList from "./ProductList";

const page = async () => {
  const products: any = await prisma.product.findMany();

  return (
    <Suspense fallback={<>Loading....</>}>
      <ProductList products={products} />
    </Suspense>
  );
};

export default page;
