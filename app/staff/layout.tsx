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
  console.log(user);
  if (!user || user.role !== "STAFF") {
    redirect("/unauthorized");
  }

  const navLinks = [
    {
      name: "Dashboard",
      link: "/staff",
      icon: "LayoutDashboard",
    },
    {
      name: "Inventory",
      link: "/staff/inventory",
      icon: "Boxes",
    },
    {
      name: "Sales History",
      link: "/staff/sales-history",
      icon: "History",
    },
  ];

  return (
    <>
      <NavAdmin navLinks={navLinks} />
      <main className="p-6">{children}</main>
    </>
  );
};

export default layout;
