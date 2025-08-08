import NavAdmin from "@/components/NavAdmin";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";
import UserProvider from "../Context/UserProvider";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getCurrentUser();
  if (!user || user.role !== "STAFF") {
    redirect("/");
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
      link: "/staff/sale-history",
      icon: "History",
    },
  ];

  return (
    <UserProvider user={user}>
      <NavAdmin navLinks={navLinks} />
      <main className="p-6">{children}</main>
    </UserProvider>
  );
};

export default layout;
