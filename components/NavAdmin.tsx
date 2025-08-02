"use client";
import { Boxes, Moon } from "lucide-react";
import React from "react";

import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tags,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

const NavAdmin = () => {
  const path = usePathname().split("/").pop();
  console.log(path);
  const navLinks = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Sales",
      link: "#",
      icon: ShoppingCart,
    },
    {
      name: "Products",
      link: "#",
      icon: Package,
    },
    {
      name: "Categories",
      link: "#",
      icon: Tags,
    },
    {
      name: "Users",
      link: "/admin/users",
      icon: Users,
    },
  ];

  return (
    <nav>
      <div className="px-4 flex items-center justify-between h-18 gap-2 shadow-sm border-b border-gray-200">
        <Boxes className="text-blue-600 h-8 w-8" />
        <h1 className="mr-auto font-semibold text-2xl">Inventory Pro</h1>

        <Moon />
      </div>

      <div className="max-lg:px-4">
        <div className="bg-background w-fit gap-2 p-2  flex flex-wrap h-fit items-center justify-center  rounded-md border shadow-xs mx-auto lg:ml-6 mt-8">
          {navLinks.map(({ name, link, icon: Icon }) => (
            <h1
              key={name}
              className={`text-sm font-medium transition-colors p-2 rounded-md ${
                path === link.split("/").pop()
                  ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              }`}
            >
              <Link href={link} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {name}
              </Link>
            </h1>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavAdmin;
