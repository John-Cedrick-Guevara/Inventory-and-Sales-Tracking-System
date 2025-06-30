"use client";
import AuthProvider from "../Context/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Users, Box, Shapes, ChartNoAxesCombined } from "lucide-react";

const navLinks = [
  {
    title: "Sales",
    url: "/admin/sales",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Category",
    url: "/admin/categories",
    icon: Shapes,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Box,
  },
  {
    title: "Staff",
    url: "/admin/staffs",
    icon: Users,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider role={"ADMIN"}>
      <SidebarProvider>
        <AppSidebar navLinks={navLinks} />
        <div className="w-full">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
