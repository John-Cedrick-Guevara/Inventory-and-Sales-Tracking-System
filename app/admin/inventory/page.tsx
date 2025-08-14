import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import ProductList from "./ProductList";

const page = async () => {
  return <ProductList />;
};

export default page;
