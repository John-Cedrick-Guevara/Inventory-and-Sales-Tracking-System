import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getCurrentUser();

  if (!user || user.role !== "STAFF") {
    redirect("/unauthorized");
  }

  return <div>{children}</div>;
};

export default layout;
