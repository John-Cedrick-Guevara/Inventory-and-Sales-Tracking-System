"use client";
import {
  Boxes,
  CircleUserRound,
  LucideIcon,
  Moon,
  Package,
  ShoppingCart,
  Tags,
  Users,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { signOutAction } from "@/app/actions/auth";
import { LayoutDashboard, History } from "lucide-react";

interface NavProps {
  navLinks: {
    name: string;
    link: string;
    icon: string;
  }[];
}

const NavAdmin = ({ navLinks }: NavProps) => {
  const path = usePathname().split("/").pop();

  const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard,
    Boxes,
    History,
    ShoppingCart,
    Package,
    Tags,
    Users,
    CircleUserRound,
    Moon,
  };

  return (
    <nav>
      <div className="px-4 flex items-center justify-between h-18 gap-2 shadow-sm border-b border-gray-200 ">
        <Boxes className="text-blue-600 h-8 w-8" />
        <h1 className="mr-auto font-semibold text-2xl">Inventory Pro</h1>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <CircleUserRound />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="mr-30 w-full max-w-60 "
            sideOffset={10}
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Change Password</DropdownMenuItem>
            <DropdownMenuItem onClick={signOutAction}>Log Out</DropdownMenuItem>
            {/* dark mode toggle */}
            <DropdownMenuItem className="flex items-center justify-between">
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
              <Switch id="airplane-mode" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="max-lg:px-4">
        <div className="bg-background w-fit gap-2 p-2  flex flex-wrap h-fit items-center justify-center  rounded-md border shadow-xs mx-auto lg:ml-6 mt-8">
          {navLinks?.map(({ name, link, icon }) => {
            const Icon = iconMap[icon];
            return (
              <Link key={name} href={link}>
                <h1
                  className={`text-sm font-medium transition-colors p-2 rounded-md flex items-center gap-2 ${
                    path === link.split("/").pop()
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {name}
                </h1>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavAdmin;
