// "use client";
import { getCurrentUser } from "@/lib/getCurrentUser";

import { redirect } from "next/navigation";


import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<userData | null>(null);

interface userData {
  name: string;
  id: number;
  role: string;
}

const AuthProvider = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "ADMIN" | "STAFF";
}) => {
  const [userData, setUserData] = useState<null | userData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
 

  useEffect(() => {
    async function getToken() {
      try {
        const userData = await getCurrentUser();
        const userRole = userData?.role;
        setUserData(userData);
        if (userRole !== role) {
          redirect("/");
        }
      } catch (error) {
        console.log(error);
        redirect("/");
      } finally {
        setIsLoading(false);
      }
    }
    getToken();
  }, []);

  if (isLoading) <h1>loadingg....</h1>;

  return (
    <AuthContext.Provider value={userData}>
      {userData ? children : "loading..."}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}