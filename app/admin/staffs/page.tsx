"use client";
import TableComponent from "@/components/Table";
import { GetUser, UserCredentials, Users } from "@/lib/interfaces";
import useSWR from "swr";
import React, { Suspense, useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { PencilLine, Trash, UserRoundPlus } from "lucide-react";
import UserForm from "@/components/UserForm";
import { UserCredentialsSchema } from "@/lib/schemas";
import axios from "axios";
import IconButton from "@/components/IconButton";
import FilterBar from "@/components/FilterBar";
import PaginationControls from "@/components/PaginationControls";
import Loading from "../sales/Loading";

const staffsTable = () => {
  // pagination essentials
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // fetcher
  const { data, error, isLoading, mutate } = useSWR<GetUser>(
    `/api/users?page=${page}&pageSize=${pageSize}`,
    fetcher,
    { suspense: true }
  );

  // form state handler
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formError, setFormError] = useState("");

  // data filtration essensials
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [searchUser, setSearchUser] = useState<string>("");

  // data credentials
  const [credentials, setCredentials] = useState<UserCredentials>({
    action: "signUp",
    email: "",
    password: "",
    name: "",
  });

  const [editCredentials, setEditCredentials] = useState<UserCredentials>({
    action: "editCredentials",
    id: 0,
    email: "",
    password: "",
    name: "",
  });

  // handles creation of new user
  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedData = UserCredentialsSchema.safeParse(credentials);
    if (parsedData.success) {
      try {
        const res = await axios.post("/api/users", parsedData.data);

        mutate();

        setShowForm(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            (error.response?.data.message as string) ||
            "Something went wrong. Please wait";
          setFormError(message);
        } else {
          setFormError("An unexpected error occured");
        }
      }
    } else {
      setFormError(parsedData.error.issues[0].message);
    }
  }

  // handles edit of user data
  async function handleEditUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedData = UserCredentialsSchema.safeParse(editCredentials);
    if (parsedData.success) {
      try {
        const res = await axios.put("/api/users", parsedData.data);
        mutate();
        setShowEditForm(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message =
            (error.response?.data.message as string) ||
            "Something went wrong. Please wait";
          setFormError(message);
        } else {
          setFormError("An unexpected error occured");
        }
      }
    } else {
      setFormError(parsedData.error.issues[0].message);
    }
  }

  // handles deletion of user
  async function handleDeleteUser(id: number | undefined) {
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

  // gets user's data to be edited
  function getToEditUser(user: UserCredentials) {
    setEditCredentials((prev) => ({ ...prev, ...user }));
    setShowEditForm(true);
  }

  useEffect(() => {
    // set roles existing in data
    if (data) {
      setRoles((prev) => {
        const updated = [...prev];
        for (const item of data.data) {
          if (!updated.includes(item.role as string)) {
            updated.push(item.role as string);
          }
        }

        return updated;
      });
    }
  }, [data]);

  return (
    <main className="w-full">
      {/* filter bar(search bar and dropdown) */}
      <FilterBar
        searchItem={searchUser}
        setSearchItem={setSearchUser}
        selectedCategory={selectedRole}
        setSelectedCategory={setSelectedRole}
        categories={roles}
      />
      <Suspense fallback={<Loading />}>
        {/* data table */}
        <TableComponent
          title={isLoading ? "fetching users" : "StaffsTable"}
          tableHead={["userId", "name", "email", "role"]}
          tableItems={["id", "name", "email", "role"] as (keyof Users)[]}
          data={
            data?.data.filter((item) =>
              searchUser
                ? item.name.toLowerCase().includes(searchUser.toLowerCase())
                : item && selectedRole
                ? item.role === selectedRole
                : item
            ) ?? []
          }
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
      </Suspense>

      {/* pagination shit */}
      <PaginationControls data={data} setPage={setPage} page={page} />

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
          formError={formError}
          setFormError={setFormError}
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
          formError={formError}
          setFormError={setFormError}
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
