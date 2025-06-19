"use client";

import IconButton from "@/components/IconButton";
import TableComponent from "@/components/Table";
import { fetcher } from "@/lib/fetcher";
import { Product } from "@/lib/interfaces";
import React, { useState } from "react";
import useSWR from "swr";
import { PackagePlus } from "lucide-react";
import ProductForm from "@/components/ProductForm";

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
    createdAt: "",
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
      createdAt: "",
    }
  );

  async function handleSubmit() {
    try {
      
      
    } catch (error) {console.log(error);}
  }
  async function handleEditCathegory() {
    try {
    } catch (error) {}
  }

  return (
    <div>
      <TableComponent
        tableHead={[]}
        tableItems={[]}
        data={[]}
        title={"Products Table"}
        // renderActions={}
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
          handleAddProduct={handleEditCathegory}
          credentials={editProductCredentials}
          setCredentials={setEditProductCredentials}
          showForm={showEditForm}
          setShowForm={setShowEditForm}
          title={"Item product"}
        />
      )}
    </div>
  );
};

export default productPage;
