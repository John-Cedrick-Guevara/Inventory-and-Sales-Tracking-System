import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import { CategoryList } from "./CategoryList";

const page = async () => {
  return <CategoryList />;
};

export default page;
