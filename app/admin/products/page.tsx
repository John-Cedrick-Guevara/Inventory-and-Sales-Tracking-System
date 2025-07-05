"use client";
import IconButton from "@/components/IconButton";
import TableComponent from "@/components/Table";
import { fetcher } from "@/lib/fetcher";
import { GetProduct, Product } from "@/lib/interfaces";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { PackagePlus, PencilLine, Trash } from "lucide-react";
import ProductForm from "@/components/ProductForm";
import { ProductSchema } from "@/lib/schemas";
import axios from "axios";
import FilterBar from "@/components/FilterBar";
import PaginationControls from "@/components/PaginationControls";

const productPage = () => {
  // things for front end pagination
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // fetcher
  const { data, error, isLoading, mutate } = useSWR<GetProduct>(
    `/api/products?page=${page}&pageSize=${pageSize}`,
    fetcher
  );

  // form state handler
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formError, setFormError] = useState("");

  // data filter essentials
  const [categories, setCtegories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchItem, setSearchItem] = useState<string>("");

  // add and edit data credentials
  const [productCredentials, setProductCredentials] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    category: {
      name: "",
      id: 0,
    },
  });
  const [editProductCredentials, setEditProductCredentials] = useState<Product>(
    {
      id: 0,
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      category: {
        name: "",
        id: 0,
      },
    }
  );

  // image converter
  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  // object to base 64 file converter
  function objectToBase64(byteObject: Record<number, number>): Promise<string> {
    const byteArray = new Uint8Array(Object.values(byteObject)); // convert object to Uint8Array
    const blob = new Blob([byteArray], { type: "image/png" }); // or image/jpeg if needed

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          resolve(reader.result); // ✅ base64 string (data:image/png;base64,...)
        } else {
          reject("Failed to convert blob to Base64");
        }
      };
      reader.onerror = () => reject("FileReader error");
      reader.readAsDataURL(blob);
    });
  }

  // handles submission of new data
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // image
    const image: File = productCredentials.image;
    if (!image) {
      setFormError("Please provide an image for the product.");
    } else {
      // converted image
      const base64 = await toBase64(image);

      const productData = {
        ...productCredentials,
        image: base64.split(",")[1],
      };

      // post req
      const parsedData = ProductSchema.safeParse(productData);
      if (parsedData.success) {
        try {
          const uploadProduct = await axios.post(
            "/api/products",
            parsedData.data
          );

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
  }

  // handles submission of edited data
  async function handleEditProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // image
    const image: File | any = editProductCredentials.image;

    let editedProductData = editProductCredentials;

    if (image.name === undefined) {
      const base64 = await objectToBase64(image);

      editedProductData = {
        ...editProductCredentials,

        image: base64.split(",")[1],
      };
    } else {
      // converted image
      const base64 = await toBase64(image);

      editedProductData = {
        ...editProductCredentials,
        image: base64.split(",")[1],
      };
      console.log(base64.split(",")[1]);
    }

    const parsedData = ProductSchema.safeParse(editedProductData);
    if (parsedData.success) {
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

  // gets product to be edited
  function getToEditProduct(product: Product) {
    setShowEditForm(true);
    console.log(product);

    setEditProductCredentials(product);
  }

  // handles deletion of product
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

  // gets existing categories in products array
  useEffect(() => {
    if (data) {
      setCtegories((prev) => {
        const updated = [...prev];
        for (const item of data.data) {
          if (!updated.includes(item.category?.name as string)) {
            updated.push(item.category?.name as string);
          }
        }

        return updated;
      });
    }
  }, [data]);

  return (
    <div>
      {/* search bar and dropdown */}
      <FilterBar
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* table of products */}
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
            "category",
          ] as (keyof Product)[]
        }
        data={
          data?.data.filter((item) =>
            searchItem
              ? item.name.toLowerCase().includes(searchItem.toLowerCase())
              : item && selectedCategory
              ? item.category?.name === selectedCategory
              : item
          ) ?? []
        }
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

      {/* next and prev pagination controls */}
      <PaginationControls data={data} setPage={setPage} page={page} />

      {/* add form and icon */}
      <div className=" fixed bottom-10 w-fit" onClick={() => setShowForm(true)}>
        <IconButton
          variant="outline"
          IconButton={PackagePlus}
          tooltip={"Add Product"}
        />
      </div>

      {/* add product form */}
      {showForm && !showEditForm && (
        <ProductForm
          formError={formError}
          setFormError={setFormError}
          handleAddProduct={handleSubmit}
          credentials={productCredentials}
          setCredentials={setProductCredentials}
          showForm={showForm}
          setShowForm={setShowForm}
          title={"Add new product"}
        />
      )}

      {/* edit product form  */}
      {showEditForm && !showForm && (
        <ProductForm
          formError={formError}
          setFormError={setFormError}
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
