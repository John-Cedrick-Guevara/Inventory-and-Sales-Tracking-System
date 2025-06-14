"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { handleChange } from "@/lib/handleChange";
import { signUpSchema } from "@/lib/schemas";
import axios from "axios";
import { CircleArrowLeft } from "lucide-react";
import IconButton from "./IconButton";
import { UserCredentials } from "@/lib/interfaces";

interface FormProps {
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  credentials: UserCredentials;
  setCredentials: React.Dispatch<React.SetStateAction<UserCredentials>>;
}

const UserForm = ({ handleSignUp, credentials, setCredentials }: FormProps) => {
  return (
    <form
      action=""
      onSubmit={handleSignUp}
      className=" flex flex-col gap-10 items-center justify-start bg-white shadow-2xl h-fit p-10 w-full max-w-lg rounded-lg"
    >
      <h1 className="font-bold text-3xl mb-12 mt-7">Log In</h1>

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
            value={credentials.name}
            placeholder="Name"
          />
        </div>

        {/* email */}
        <div className="grid w-full max-w-xs items-center gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            onChange={(e) => handleChange(e, setCredentials)}
            type="email"
            id="email"
            value={credentials.email}
            placeholder="Email"
          />
        </div>

        {/* password */}
        <div className="grid w-full max-w-xs items-center gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            onChange={(e) => handleChange(e, setCredentials)}
            type="password"
            id="password"
            value={credentials.password}
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
  );
};

export default UserForm;
