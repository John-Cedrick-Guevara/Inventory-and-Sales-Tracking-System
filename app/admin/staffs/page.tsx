"use client";
import TableComponent from "@/components/Table";
import {
  Categories,
  editUserCredentials,
  UserCredentials,
  Users,
} from "@/lib/interfaces";
import useSWR from "swr";
import React, { useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { PencilLine, Trash, UserRoundPlus } from "lucide-react";
import UserForm from "@/components/UserForm";
import { UserCredentialsSchema } from "@/lib/schemas";
import axios from "axios";
import IconButton from "@/components/IconButton";

const staffsTable = () => {
  const { data, error, isLoading, mutate } = useSWR<Users[]>(
    "/api/users/",
    fetcher
  );
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

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
      const parsedData = UserCredentialsSchema.safeParse(credentials);

      const res = await axios.post("/api/users", parsedData.data);

      mutate();

      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const parsedData = UserCredentialsSchema.safeParse(editCredentials);

      console.log(parsedData);
      const res = await axios.put("/api/users", parsedData.data);

      mutate();
      setShowEditForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUser(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return true;

    try {
      const res = await axios.delete("/api/users", { data: id });

      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  function getToEditUser(user: editUserCredentials) {
    setEditCredentials(user);
    setShowEditForm(true);
  }

  return (
    <main className="w-full">
      <TableComponent
        title={isLoading ? "fetching users" : "StaffsTable"}
        tableHead={["userId", "name", "email", "role", "sales"]}
        tableItems={["id", "name", "email", "role", "sales"] as (keyof Users)[]}
        data={data ?? []}
        renderActions={(item) => (
          <>
            {" "}
            <div onClick={() => getToEditUser(item)}>
              {" "}
              <IconButton
                IconButton={PencilLine}
                tooltip={"Edit Credentials"}
                variant={"default"}
              />{" "}
            </div>{" "}
            {/* delete icon */}{" "}
            <div onClick={() => handleDeleteUser(item.id)}>
              {" "}
              <IconButton
                IconButton={Trash}
                tooltip={"Delete User"}
                variant={"destructive"}
              />{" "}
            </div>{" "}
          </>
        )}
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
      {showForm && !showEditForm && (
        <UserForm
          handleSignUp={handleSignUp}
          title={"Add user"}
          showForm={showForm}
          setShowForm={setShowForm}
          credentials={credentials}
          setCredentials={setCredentials}
        />
      )}

      {/* Form component for editing user's credentials */}
      {showEditForm && !showForm && (
        <UserForm
          handleSignUp={handleEditUser}
          title={"Edit User"}
          showForm={showEditForm}
          setShowForm={setShowEditForm}
          credentials={editCredentials}
          setCredentials={setEditCredentials}
        />
      )}
    </main>
  );
};

export default staffsTable;
