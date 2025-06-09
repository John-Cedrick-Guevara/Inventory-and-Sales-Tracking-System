"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<userData | null>(null);

interface userData {
  name: string;
  email: string;
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
  const router = useRouter();

  useEffect(() => {
    async function getToken() {
      try {
        const userToken = await axios.get("/api/me");
        const userData = userToken.data.userData;
        setUserData(userData);
        if (userData.role !== role) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        router.push("/");
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
