"use client";
import CathegoryForm from "@/components/CategoryForm";
import IconButton from "@/components/IconButton";
import TableComponent from "@/components/Table";
import { fetcher } from "@/lib/fetcher";
import { Categories } from "@/lib/interfaces";
import { CategoriesSchema } from "@/lib/schemas";
import axios from "axios";
import { Diamond, DiamondPlus, PencilLine, Trash } from "lucide-react";
import React, { useState } from "react";
import useSWR from "swr";

const categoriesPage = () => {
  const { data, error, isLoading, mutate } = useSWR<Categories[]>(
    "/api/categories/",
    fetcher
  );
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [cathegoryCredentials, setCathegoryCredentials] = useState<Categories>({
    name: "",
  });
  const [editCathegoryCredentials, setEditCathegoryCredentials] =
    useState<Categories>({
      name: "",
      id: 0,
    });

  function getToEditCathegory(item: Categories) {
    setShowEditForm(true);
    setEditCathegoryCredentials(item);
    console.log(item);
  }



  async function handletoDeleteCathegory(item: number | undefined) {
    try {
      const deleteCathegory = await axios.delete("/api/categories/", {
        data: item,
      });

      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditCathegory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedcathegory = CategoriesSchema.safeParse(
      editCathegoryCredentials
    );

    if (parsedcathegory.success) {
      try {
        const editcathegory = await axios.put(
          "/api/categories/",
          parsedcathegory
        );

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
      setFormError(parsedcathegory.error.issues[0].message);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(cathegoryCredentials);
    const parsedcathegory = CategoriesSchema.safeParse(cathegoryCredentials);

    if (parsedcathegory.success) {
      try {
        const addcathegory = await axios.post(
          "/api/categories/",
          parsedcathegory
        );

        mutate();
        setShowForm(false);
        setCathegoryCredentials({ name: "" });
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
      setFormError(parsedcathegory.error.issues[0].message);
    }
  }

  return (
    <div>
      {" "}
      <TableComponent
        title={isLoading ? "fetching categories" : "Categories"}
        tableHead={["Category Id", "name"]}
        tableItems={["id", "name"] as (keyof Categories)[]}
        data={data ?? []}
        renderActions={(item) => (
          <>
            {" "}
            <div onClick={() => getToEditCathegory(item)}>
              {" "}
              <IconButton
                IconButton={PencilLine}
                tooltip={"Edit Category"}
                variant={"default"}
              />{" "}
            </div>{" "}
            {/* delete icon */}{" "}
            <div onClick={() => handletoDeleteCathegory(item.id)}>
              {" "}
              <IconButton
                IconButton={Trash}
                tooltip={"Delete Category"}
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
          error={formError}
          setError={setFormError}
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
          error={formError}
          setError={setFormError}
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

export default categoriesPage;
