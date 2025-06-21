"use client";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { handleChange } from "@/lib/handleChange";

import { CircleArrowLeft } from "lucide-react";
import IconButton from "./IconButton";
import { ChangePassword, editUserCredentials, UserCredentials } from "@/lib/interfaces";

interface FormProps<T extends ChangePassword> {
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  credentials: T;
  setCredentials: React.Dispatch<React.SetStateAction<T>>;
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  title: string;
}

function ChangePassForm<T extends ChangePassword>({
  handleSignUp,
  credentials,
  setCredentials,
  showForm,
  setShowForm,
  title,
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
          onSubmit={handleSignUp}
          className=" flex flex-col gap-10 items-center justify-start bg-white shadow-2xl h-fit p-10 w-full max-w-lg rounded-lg"
        >
          <h1 className="font-bold text-3xl mb-12 mt-7">{title}</h1>

          {/* input fields */}
          <section className="w-full max-w-xs flex flex-col gap-4 items-center">
            {/* password */}
            <div className="grid w-full max-w-xs items-center gap-1">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                onChange={(e) => handleChange(e, setCredentials)}
                type="password"
                id="password"
                value={credentials?.password ?? ""}
                placeholder="Password"
              />
            </div>
            {/* new password password */}
            <div className="grid w-full max-w-xs items-center gap-1">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                name="newPassword"
                onChange={(e) => handleChange(e, setCredentials)}
                type="password"
                id="newPassword"
                value={credentials?.newPassword ?? ""}
                placeholder="Enter your new password"
              />
            </div>
            <Button size={"sm"} variant={"outline"}>
              {title}
            </Button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default ChangePassForm;
