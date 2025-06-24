"use client"
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AuthProvider from "../Context/AuthContext";
import { Box, History } from "lucide-react";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks = [
    {
      title: "Products",
      url: "/admin/products",
      icon: Box,
    },
    {
      title: "Sales History",
      url: "#",
      icon: History,
    },
  ];

  return (
    <AuthProvider role={"STAFF"}>
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
