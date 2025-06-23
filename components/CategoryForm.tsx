"use client";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { handleChange } from "@/lib/handleChange";
import { DiamondPlus } from "lucide-react";
import { CircleArrowLeft } from "lucide-react";
import IconButton from "./IconButton";
import {
  Categories,
  editUserCredentials,
  UserCredentials,
} from "@/lib/interfaces";
import FormError from "./FormError";

interface FormProps<T extends UserCredentials | Categories> {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  credentials: T;
  setCredentials: React.Dispatch<React.SetStateAction<T>>;
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  title: string;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

function CathegoryForm<T extends UserCredentials | Categories>({
  handleSubmit,
  credentials,
  setCredentials,
  showForm,
  setShowForm,
  title,
  error,
  setError,
}: FormProps<T>) {
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
          onSubmit={handleSubmit}
          className=" flex flex-col gap-10 items-center justify-start bg-white shadow-2xl h-fit p-10 w-full max-w-lg rounded-lg"
        >
          <h1 className="font-bold text-3xl mb-12 mt-7">{title}</h1>

          <FormError error={error} setError={setError} />

          {/* input fields */}
          <section className="w-full max-w-xs flex flex-col gap-4 items-center">
            {/* name */}
            <div className="grid w-full max-w-xs items-center gap-1">
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

            <Button size={"lg"} variant={"outline"}>
              {title}
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default CathegoryForm;
