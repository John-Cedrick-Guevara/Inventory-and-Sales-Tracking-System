import { useUser } from "@/app/Context/UserContext";
import SalesHistory from "@/components/SalesHistoryList";
import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import { includes } from "zod/v4";

const page = async () => {
  const user: any = await getCurrentUser();

  return (
    <>
      <h1 className="text-xl font-bold text-gray-500 py-2 px-3 rounded-2xl bg-blue-100 mr-auto self-center w-fit">
        {user.name.slice(0, 1).toUpperCase() + user.name.slice(1)}'s sales
        history
      </h1>
      <SalesHistory user={user} />
    </>
  );
};

export default page;
