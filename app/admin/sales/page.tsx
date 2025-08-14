import React from "react";

import { getCurrentUser } from "@/lib/getCurrentUser";
import SalesHistory from "@/components/SalesHistoryList";

const page = async () => {
  const user: any = await getCurrentUser();
  return <SalesHistory user={user} />;
};

export default page;
