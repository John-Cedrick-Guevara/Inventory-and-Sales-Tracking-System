import ListHeader from "@/components/ListHeader";

import React, { Suspense } from "react";
import InventoryList from "./InventoryList";
import prisma from "@/lib/prisma";

const page = async () => {
  const rawProducts: any = await prisma.product.findMany({
    include: {
      category: true, 
    },
  });
  const rawCategories: any = await prisma.category.findMany();
  
  const convertedProducts = rawProducts.map((product: any) => {
    const base64 = Buffer.from(product.image).toString("base64");
    const dataUrl = `data:image/png;base64,${base64}`;
    return ({
      ...product,
      image: dataUrl, // or .toString("utf-8") if it's text
      category: product.category,
      
    });
  });


  const products = JSON.parse(JSON.stringify(convertedProducts));
  const categories = JSON.parse(JSON.stringify(rawCategories));

  return (
    <Suspense fallback={<>Mag Hintay Ka Kupal!!</>}>
      <InventoryList products={products} categories={categories} />
    </Suspense>
  );
};

export default page;
