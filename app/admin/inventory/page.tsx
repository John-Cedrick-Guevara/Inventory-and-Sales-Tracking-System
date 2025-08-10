import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import ProductList from "./ProductList";

const page = async () => {
  const rawProducts: any = await prisma.product.findMany({
    include: {
      category: true,
      saleItems :true
    },
  });
  const categories: any = await prisma.category.findMany();

  const convertedProducts = rawProducts.map((product: any) => {
    const base64 = Buffer.from(product.image).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;
    return {
      ...product,
      image: dataUrl, // or .toString("utf-8") if it's text
      category: product.category,
    };
  });

  return (
    <Suspense fallback={<>Loading....</>}>
      <ProductList categories={categories} products={convertedProducts} />
    </Suspense>
  );
};

export default page;
