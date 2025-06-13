"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { handleChange } from "@/lib/handleChange";
import { signUpSchema } from "@/lib/schemas";
import axios from "axios";

interface Props {
  showForm: boolean;
}

const AddUserForm = ({ showForm }: Props) => {
  const [credentials, setCredentials] = useState({
    action: "signUp",
    email: "",
    password: "",
    name: "",
  });

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const parsedData = signUpSchema.safeParse(credentials);

      const res = await axios.post("/api/users", parsedData.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`w-full scale-0 h-full absolute top-0 right-0 flex items-center justify-center mx-auto transition-all  z-30 ${
        showForm && "scale-100  bg-white/70"
      }`}
    >
      <form
        action=""
        onSubmit={handleSignUp}
        className=" flex flex-col gap-10 items-center justify-start bg-white shadow-2xl h-fit p-10 w-full max-w-lg rounded-lg"
      >
        <h1 className="font-bold text-3xl mb-12">Log In</h1>

        {/* input fields */}
        <section className="w-full max-w-xs flex flex-col gap-4 items-center">
          {/* email */}
          <div className="grid w-full max-w-xs items-center gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              onChange={(e) => handleChange(e, setCredentials)}
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>

          {/* name */}
          <div className="grid w-full max-w-xs items-center gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              name="name"
              onChange={(e) => handleChange(e, setCredentials)}
              type="text"
              id="name"
              placeholder="Email"
            />
          </div>

          {/* password */}
          <div className="grid w-full max-w-xs items-center gap-1">
            <Label htmlFor="email">Password</Label>
            <Input
              name="password"
              onChange={(e) => handleChange(e, setCredentials)}
              type="password"
              id="email"
              placeholder="Password"
            />
          </div>

          {/* retype password */}

          <Button size={"sm"} variant={"outline"}>
            {" "}
            Sign up
          </Button>
        </section>
      </form>
    </div>
  );
};

export default AddUserForm;
