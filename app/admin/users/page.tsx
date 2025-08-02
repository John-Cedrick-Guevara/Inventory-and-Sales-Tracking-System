import { Users } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import React, { Suspense, use } from "react";
import { UserList } from "./UserList";

const page = async () => {
  const users: any = await prisma.user.findMany({ where: { role: "STAFF" } });

  return (
    <Suspense fallback={<>Loading....</>}>
      <UserList users={users} />
    </Suspense>
  );
};

export default page;
