import ListHeader from "@/components/ListHeader";

import React, { Suspense } from "react";
import InventoryList from "./InventoryList";
import prisma from "@/lib/prisma";

const page = async () => {
  return <InventoryList />;
};

export default page;
