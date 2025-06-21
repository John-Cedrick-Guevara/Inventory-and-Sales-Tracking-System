"use client";
import { LucideIcon, Settings } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SetStateAction, useState } from "react";
import ChangePassForm from "./ChangePassForm";
import { ChangePassword } from "@/lib/interfaces";
import { ChangePasswordSchema } from "@/lib/schemas";
import { useAuth } from "@/app/Context/AuthContext";

// Menu items.

interface Props {
  navLinks: { title: string; url: string; icon: LucideIcon }[];
}

export function AppSidebar({ navLinks }: Props) {
  const user = useAuth();
  const [curr, setCurr] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newPassCredentials, setNewPassCredentials] = useState<ChangePassword>({
    action: "editPass",
    id: user?.id as number,
    password: "",
    newPassword: "",
  });
  const router = useRouter();

  function handleLogOut() {
    try {
      axios.post("/api/users/logOut");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChangePass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedData = ChangePasswordSchema.safeParse(newPassCredentials);
    console.log(parsedData);
    try {
      const newPass = await axios.put("/api/users", parsedData.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="mb-10 text-md">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="pl-2">
                {navLinks.map((item) => (
                  <SidebarMenuItem
                    className={`${
                      item.title === curr && "bg-sidebar-accent rounded-md"
                    }`}
                    key={item.title}
                    onClick={() => setCurr(item.title)}
                  >
                    <SidebarMenuButton asChild>
                      <Link prefetch href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className=" flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full" size={"lg"} variant="outline">
                  <Settings />
                  <span>Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Settings:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup>
                  <DropdownMenuRadioItem onClick={handleLogOut} value={""}>
                    Log Out
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem onClick={() => setShowForm(true)} value={""}>
                    Change Password
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
          {showForm && (
            <ChangePassForm
              handleSignUp={handleChangePass}
              credentials={newPassCredentials}
              setCredentials={setNewPassCredentials}
              showForm={showForm}
              setShowForm={setShowForm}
              title={"Change password"}
            />
          )}
    </>
  );
}
