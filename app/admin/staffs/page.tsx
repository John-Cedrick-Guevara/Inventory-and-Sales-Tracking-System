"use client";
import TableComponent from "@/components/Table";
import { editUserCredentials, UserCredentials, Users } from "@/lib/interfaces";
import useSWR from "swr";
import React, { useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { UserRoundPlus } from "lucide-react";
import UserForm from "@/components/UserForm";
import { signUpSchema } from "@/lib/schemas";
import axios from "axios";
import IconButton from "@/components/IconButton";

const staffsTable = () => {
  const { data, error, isLoading, mutate } = useSWR<Users[]>(
    "/api/users/",
    fetcher
  );
  const [showForm, setShowForm] = useState(false);
  const [credentials, setCredentials] = useState<UserCredentials>({
    action: "signUp",
    email: "",
    password: "",
    name: "",
  });
  const [editCredentials, setEditCredentials] = useState<editUserCredentials>({
    id: 0,
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
    <main className="w-full">
      <TableComponent
        title={isLoading ? "fetching users" : "StaffsTable"}
        tableHead={["userId", "name", "email", "role", "sales"]}
        tableItems={["id", "name", "email", "role", "sales"] as (keyof Users)[]}
        data={data ?? []}
        credentials={credentials}
        setCredentials={setCredentials}
      ></TableComponent>

      {/* add form and icon */}
      <div
        className=" fixed bottom-10 w-full z-40"
        onClick={() => setShowForm(true)}
      >
        <IconButton
          variant="outline"
          IconButton={UserRoundPlus}
          tooltip={"Add user"}
        />
      </div>

      {/* Form component for creating new users */}
      <UserForm
        handleSignUp={handleSignUp}
        title={"Log In"}
        showForm={showForm}
        setShowForm={setShowForm}
        credentials={credentials}
        setCredentials={setCredentials}
      />

      {/* Form component for editing user's credentials */}
      <UserForm
        handleSignUp={handleSignUp}
        title={"Log In"}
        showForm={showForm}
        setShowForm={setShowForm}
        credentials={editCredentials}
        setCredentials={setEditCredentials}
      />
    </main>
  );
};

export default staffsTable;
