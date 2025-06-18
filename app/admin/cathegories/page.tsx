"use client";
import CathegoryForm from "@/components/CathegoryForm";
import IconButton from "@/components/IconButton";
import TableComponent from "@/components/Table";
import { fetcher } from "@/lib/fetcher";
import {
  Cathegories,
  editUserCredentials,
  UserCredentials,
  Users,
} from "@/lib/interfaces";
import { CathegoriesSchema } from "@/lib/schemas";
import axios from "axios";
import { Diamond, DiamondPlus, PencilLine, Trash } from "lucide-react";
import React, { useState } from "react";
import useSWR from "swr";

const cathegoriesPage = () => {
  const { data, error, isLoading, mutate } = useSWR<Cathegories[]>(
    "/api/cathegories/",
    fetcher
  );
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [cathegoryCredentials, setCathegoryCredentials] = useState<Cathegories>(
    {
      name: "",
    }
  );
  const [editCathegoryCredentials, setEditCathegoryCredentials] =
    useState<Cathegories>({
      name: "",
      id: 0,
    });

  function getToEditCathegory(item: Cathegories) {
    setShowEditForm(true);
    setEditCathegoryCredentials(item);
  }
  async function handleEditCathegory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedcathegory = CathegoriesSchema.safeParse(
      editCathegoryCredentials
    );

    try {
      const editcathegory = await axios.put(
        "/api/cathegories/",
        parsedcathegory
      );

      mutate();
      setShowEditForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handletoDeleteCathegory(item: number | undefined) {
    try {
      const editcathegory = await axios.delete("/api/cathegories/", {
        data: item,
      });

      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(cathegoryCredentials);
    const parsedcathegory = CathegoriesSchema.safeParse(cathegoryCredentials);
    try {
      const addcathegory = await axios.post(
        "/api/cathegories/",
        parsedcathegory
      );

      mutate();
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {" "}
      <TableComponent
        title={isLoading ? "fetching cathegories" : "Cathegories"}
        tableHead={["Cathegory Id", "name"]}
        tableItems={["id", "name"] as (keyof Cathegories)[]}
        data={data ?? []}
        renderActions={(item) => (
          <>
            {" "}
            <div onClick={() => getToEditCathegory(item)}>
              {" "}
              <IconButton
                IconButton={PencilLine}
                tooltip={"Edit Cathegory"}
                variant={"default"}
              />{" "}
            </div>{" "}
            {/* delete icon */}{" "}
            <div onClick={() => handletoDeleteCathegory(item.id)}>
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
          IconButton={DiamondPlus}
          tooltip={"Add cathegory"}
        />
      </div>
      {showForm && !showEditForm && (
        <CathegoryForm
          handleSubmit={handleSubmit}
          credentials={cathegoryCredentials}
          setCredentials={setCathegoryCredentials}
          showForm={showForm}
          setShowForm={setShowForm}
          title={"Create new cathegory"}
        />
      )}
      {showEditForm && !showForm && (
        <CathegoryForm
          handleSubmit={handleEditCathegory}
          credentials={editCathegoryCredentials}
          setCredentials={setEditCathegoryCredentials}
          showForm={showEditForm}
          setShowForm={setShowEditForm}
          title={"Edit cathegory"}
        />
      )}
    </div>
  );
};

export default cathegoriesPage;
