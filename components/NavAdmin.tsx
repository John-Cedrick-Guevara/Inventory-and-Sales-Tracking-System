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
import React, { useActionState, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { changePassword, signOutAction } from "@/app/actions/auth";
import { LayoutDashboard, History } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUser } from "@/app/Context/UserContext";

interface NavProps {
  navLinks: {
    name: string;
    link: string;
    icon: string;
  }[];
}

const NavAdmin = ({ navLinks }: NavProps) => {
  const path = usePathname().split("/").pop();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const [data, action, isPending] = useActionState(changePassword, undefined);
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
    <nav className="dark:bg-gray-900">
      <div className="px-4 flex items-center justify-between h-18 gap-2 shadow-sm border-b border-gray-200 ">
        <Boxes className="text-blue-600 h-8 w-8" />
        <h1 className="mr-auto font-semibold text-2xl">Inventory Pro</h1>

        {/* user icon */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CircleUserRound />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="mr-30 w-full max-w-60 dark:bg-gray-700"
            sideOffset={10}
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Change password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOutAction}>Log Out</DropdownMenuItem>
            {/* dark mode toggle */}
            <DropdownMenuItem className="flex items-center justify-between">
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
              <Switch
                id="airplane-mode"
                checked={dark}
                onClick={() => {
                  const html = document.documentElement;
                  if (html.classList.contains("dark")) {
                    html.classList.remove("dark");
                    localStorage.theme = "light";
                    setDark(false);
                  } else {
                    setDark(true);
                    html.classList.add("dark");
                    localStorage.theme = "dark";
                  }
                }}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* nav */}
      <div className="max-lg:px-4 ">
        <div className="bg-background dark:bg-gray-800 dark:border-gray-700 w-fit gap-2 p-2  flex flex-wrap h-fit items-center justify-center  rounded-md border shadow-xs mx-auto lg:ml-6 mt-8">
          {navLinks?.map(({ name, link, icon }) => {
            const Icon = iconMap[icon];
            return (
              <Link key={name} href={link}>
                <h1
                  className={`text-sm font-medium transition-colors p-2 rounded-md flex items-center gap-2 ${
                    path === link.split("/").pop()
                      ? "bg-blue-100 dark:bg-blue-700/50 text-blue-700 dark:text-blue-300"
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

      {/* change password dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change your password</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Make sure to double check your
              password.
            </DialogDescription>
          </DialogHeader>

          {/* change pass form */}
          <form action={action} className="flex flex-col items-center  gap-4">
            {/* password */}
            <div className="grid w-full max-w-sm items-center gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </div>

            {/* password confirmation */}
            <div className="grid w-full max-w-sm items-center gap-1">
              <Label htmlFor="password2">Confirm password</Label>
              <Input
                name="password2"
                type="password"
                id="password2"
                placeholder="Confirm password"
              />
            </div>

            {/* form error/message */}
            {data?.error && (
              <div
                className={`rounded-md ${
                  data?.success
                    ? "bg-green-50 dark:bg-green-900/50"
                    : "bg-red-50 dark:bg-red-900/50"
                } p-4 w-full max-w-sm`}
              >
                <p
                  className={`text-sm ${
                    data?.success
                      ? "text-green-800 dark:text-green-200"
                      : "text-red-800 dark:text-red-200"
                  }`}
                >
                  {data?.error}
                </p>
              </div>
            )}

            <DialogFooter className="self-end">
              <DialogClose asChild>
                <Button type="submit" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default NavAdmin;
