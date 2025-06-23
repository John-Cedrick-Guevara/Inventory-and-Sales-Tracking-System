"use client";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { handleChange } from "@/lib/handleChange";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleArrowLeft } from "lucide-react";
import IconButton from "./IconButton";
import { Categories } from "@/lib/interfaces";
import { Textarea } from "./ui/textarea";
import { Product } from "@/lib/interfaces";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import FormError from "./FormError";

interface FormProps<T extends Product> {
  handleAddProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  credentials: T;
  setCredentials: React.Dispatch<React.SetStateAction<T>>;
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  title: string;
  formError: string;
  setFormError: React.Dispatch<React.SetStateAction<string>>;
}

function ProductForm<T extends Product>({
  handleAddProduct,
  credentials,
  setCredentials,
  showForm,
  setShowForm,
  title,
  formError,
  setFormError,
}: FormProps<T>) {
  const {
    data: category,
    error,
    isLoading,
    mutate,
  } = useSWR<Categories[]>("/api/categories", fetcher);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <div
      className={`w-full scale-0 h-full absolute top-0 right-0 flex items-center justify-center mx-auto transition-all  z-30 ${
        showForm && "scale-100  bg-white/70"
      }`}
    >
      {/* cancel Icon */}
      <div className="w-lg relative ">
        <div
          onClick={() => setShowForm(false)}
          className="absolute top-5 left-5"
        >
          <IconButton
            text="Cancel"
            tooltip={""}
            IconButton={CircleArrowLeft}
            variant={"outline"}
          />
        </div>
        <form
          action=""
          onSubmit={handleAddProduct}
          className=" flex flex-col gap-10 items-center justify-start bg-white shadow-2xl h-fit p-10 w-full max-w-lg rounded-lg"
        >
          <h1 className="font-bold text-3xl mb-12 mt-7">{title}</h1>

          <FormError error={formError} setError={setFormError} />

          {/* input fields */}
          <section className="w-full max-w-lg flex flex-col gap-4 items-center">
            {/* name */}
            <div className="grid w-full max-w-lg items-center gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                onChange={(e) => handleChange(e, setCredentials)}
                type="text"
                id="name"
                value={credentials?.name ?? ""}
                placeholder="Name"
              />
            </div>

            {/* Description */}
            <div className="grid w-full gap-3">
              <Label htmlFor="description">Your message</Label>
              <Textarea
                name="description"
                onChange={(e) => handleChange(e, setCredentials)}
                value={credentials.description ?? ""}
                placeholder="Description..."
                id="description"
              />
            </div>

            <div className="flex items-center justify-between gap-2  w-full max-w-lg">
              {/* price */}
              <div className="grid w-full max-w-xs items-center gap-1">
                <Label htmlFor="price">Price</Label>
                <Input
                  name="price"
                  onChange={(e) => handleChange(e, setCredentials)}
                  type="number"
                  id="price"
                  value={credentials?.price ?? 0}
                  placeholder="Price"
                />
              </div>

              {/* price */}
              <div className="grid w-full max-w-xs items-center gap-1">
                <Label htmlFor="price">Stock</Label>
                <Input
                  name="stock"
                  onChange={(e) => handleChange(e, setCredentials)}
                  type="number"
                  id="stock"
                  value={credentials?.stock ?? 0}
                  placeholder="Stock Quantity"
                />
              </div>
            </div>

            <div className=" flex items-end gap-2">
              {/* image */}
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="picture">Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/"
                  onChange={(e) => {
                    const image = e.target.files?.[0];

                    if (image) {
                      setCredentials((prev) => ({
                        ...prev,
                        image: image,
                      }));
                    }
                  }}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Choose Category</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Choose Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={credentials.cathegory}
                      onValueChange={(currCategory) => {
                        setCredentials((prev) => ({
                          ...prev,
                          category: currCategory,
                        }));
                      }}
                    >
                      {category?.map((category) => (
                        <DropdownMenuRadioItem
                          key={category.id}
                          value={category.id?.toString() ?? ""}
                        >
                          {category.name}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* retype password */}
            <Button size={"lg"} variant={"outline"}>
              {title}
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
