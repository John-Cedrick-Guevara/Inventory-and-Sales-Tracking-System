import NavAdmin from "@/components/NavAdmin";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tags,
  Users,
} from "lucide-react";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  const navLinks = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: "LayoutDashboard",
    },
    {
      name: "Sales",
      link: "#",
      icon: "ShoppingCart",
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: "Package",
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: "Tags",
    },
    {
      name: "Staffs",
      link: "/admin/users",
      icon: "Users",
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
