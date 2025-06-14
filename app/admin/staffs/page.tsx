"use client";
import TableComponent from "@/components/Table";
import { Users } from "@/lib/interfaces";
import useSWR from "swr";
import React, { useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { UserRoundPlus } from "lucide-react";
import UserForm from "@/components/UserForm";
import { signUpSchema } from "@/lib/schemas";
import axios from "axios";

const staffsTable = () => {
  const { data, error, isLoading, mutate } = useSWR<Users[]>(
    "/api/users/",
    fetcher
  );
  const [showForm, setShowForm] = useState(false);
  const [credentials, setCredentials] = useState({
    action: "signUp",
    email: "",
    password: "",
    name: "",
  });

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const parsedData = signUpSchema.safeParse(credentials);

      const res = await axios.post("/api/users", parsedData.data);

      mutate();

      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full">
      <TableComponent
        title={isLoading ? "fetching users" : "StaffsTable"}
        tableHead={["userId", "name", "email", "role", "sales"]}
        tableItems={["id", "name", "email", "role", "sales"] as (keyof Users)[]}
        data={data ?? []}
        canAdd={true}
        AddIcon={UserRoundPlus}
        FormComponent={UserForm}
        handleSignUp={handleSignUp}
        showForm={showForm}
        setShowForm={setShowForm}
        credentials={credentials}
        setCredentials={setCredentials}
      ></TableComponent>
    </div>
  );
};

export default staffsTable;
