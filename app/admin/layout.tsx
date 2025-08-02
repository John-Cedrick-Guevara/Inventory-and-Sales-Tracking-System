import NavAdmin from "@/components/NavAdmin";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <>
      <NavAdmin />
      <main className="p-6">{children}</main>
    </>
  );
};

export default layout;
