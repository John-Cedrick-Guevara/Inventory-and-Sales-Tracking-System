import { Users } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import React, { Suspense, use } from "react";
import { UserList } from "./UserList";

const page = async () => {


  return (
      <UserList  />
  );
};

export default page;
