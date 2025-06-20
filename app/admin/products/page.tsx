"use client";

import IconButton from "@/components/IconButton";
import TableComponent from "@/components/Table";
import { fetcher } from "@/lib/fetcher";
import { Product } from "@/lib/interfaces";
import React, { useState } from "react";
import useSWR from "swr";
import { PackagePlus, PencilLine, Trash } from "lucide-react";
import ProductForm from "@/components/ProductForm";
import { unknown } from "zod/v4";
import { ProductSchema } from "@/lib/schemas";
import axios from "axios";

const productPage = () => {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    "/api/products",
    fetcher
  );
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [productCredentials, setProductCredentials] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    cathegory: "",
  });
  const [editProductCredentials, setEditProductCredentials] = useState<Product>(
    {
      id: 0,
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      cathegory: "",
    }
  );

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // image
    const image: File = productCredentials.image;

    // converted image
    const base64 = await toBase64(image);

    const productData = {
      ...productCredentials,
      image: base64.split(",")[1],
    };

    const parsedData = ProductSchema.safeParse(productData);
    console.log(parsedData);
    try {
      const uploadProduct = await axios.post("/api/products", parsedData.data);

      setShowForm(false);
      setProductCredentials({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // image
    const image: File = editProductCredentials.image;

    // converted image
    const base64 = await toBase64(image);

    const editedProductData = {
      ...editProductCredentials,
      image: base64.split(",")[1],
    };

    const parsedData = ProductSchema.safeParse(editedProductData);
    console.log(parsedData);

    try {
      const uploadProduct = await axios.put("/api/products", parsedData.data);
      setShowEditForm(false);
      setEditProductCredentials({
        name: "",
        description: "",
        price: 0 as number,
        stock: 0 as number,
        image: "",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  function getToEditProduct(product: Product) {
    setShowEditForm(true);

    setEditProductCredentials(product);
  }

  async function handleDeleteProduct(item: number | undefined) {
    try {
      const deleteProduct = await axios.delete("/api/products/", {
        data: item,
      });

      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <TableComponent
        tableHead={[
          "Product Id",
          "Name",
          "Description",
          "price",
          "stock",
          "Category",
        ]}
        tableItems={
          [
            "id",
            "name",
            "description",
            "price",
            "stock",
            "cathegory",
          ] as (keyof Product)[]
        }
        data={data ?? []}
        title={"Products Table"}
        renderActions={(item) => (
          <>
            {" "}
            <div onClick={() => getToEditProduct(item)}>
              {" "}
              <IconButton
                IconButton={PencilLine}
                tooltip={"Edit Product"}
                variant={"default"}
              />{" "}
            </div>{" "}
            {/* delete icon */}{" "}
            <div onClick={() => handleDeleteProduct(item.id)}>
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
        className=" fixed bottom-10 w-full"
        onClick={() => setShowForm(true)}
      >
        <IconButton
          variant="outline"
          IconButton={PackagePlus}
          tooltip={"Add Product"}
        />
      </div>
      {showForm && !showEditForm && (
        <ProductForm
          handleAddProduct={handleSubmit}
          credentials={productCredentials}
          setCredentials={setProductCredentials}
          showForm={showForm}
          setShowForm={setShowForm}
          title={"Add new product"}
        />
      )}
      {showEditForm && !showForm && (
        <ProductForm
          handleAddProduct={handleEditProduct}
          credentials={editProductCredentials}
          setCredentials={setEditProductCredentials}
          showForm={showEditForm}
          setShowForm={setShowEditForm}
          title={"Edit Product"}
        />
      )}
    </div>
  );
};

export default productPage;
