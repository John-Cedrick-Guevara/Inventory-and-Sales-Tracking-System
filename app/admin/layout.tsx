import AuthProvider from "../Context/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Settings,
  Users,
  Box,
  Shapes,
  ChartNoAxesCombined,
} from "lucide-react";

const navLinks = [
  {
    title: "Sales",
    url: "#",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Category",
    url: "#",
    icon: Shapes,
  },
  {
    title: "Products",
    url: "#",
    icon: Box,
  },
  {
    title: "Staff",
    url: "/admin/staffs",
    icon: Users,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
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
