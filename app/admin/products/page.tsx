import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import ProductList from "./ProductList";

const page = async () => {
  const products: any = await prisma.product.findMany();
  const categories: any = await prisma.category.findMany();

  return (
    <Suspense fallback={<>Loading....</>}>
      <ProductList categories={categories} products={products} />
    </Suspense>
  );
};

export default page;
