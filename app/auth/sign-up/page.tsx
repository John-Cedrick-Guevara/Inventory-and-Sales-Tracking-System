"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import Image from "next/image";
import logo from "@/app/Assets/images/logo.png";
import { signUpSchema } from "@/lib/schemas";
import axios from "axios";
import { handleChange } from "@/lib/handleChange";

const signUp = () => {
  const [credentials, setCredentials] = useState({
    action: "signUp",
    email: "",
    password: "",
    name: "",
    retypedPassword: "",
  });

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (credentials.password !== credentials.retypedPassword) {
      alert("mali po hehe");
    } else {
      const parsedData = signUpSchema.safeParse(credentials);

      const res = await axios.post("/api/users", parsedData.data);
    }
  }

  return (
    <div>
      <main className="h-dvh">
        <form
          onSubmit={handleSignUp}
          action=""
          className="h-full flex flex-col gap-10 items-center justify-start"
        >
          <h1 className="font-bold text-3xl mb-12">Sign Up</h1>
          {/* logo */}
          <section className=" flex flex-col w-xs mb-32">
            <div className=" flex gap-2 items-center">
              <Image className="w-20 h-20" src={logo} alt={""}></Image>
              <h1 className="font-bold text-2xl">
                Inventory and sales tracking system
              </h1>
            </div>
            <p className="p-2 text-slate-500">
              A software that will make your business run smoothly.
            </p>
          </section>

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
            <div className="grid w-full max-w-xs items-center gap-1">
              <Label htmlFor="email">Retype Password</Label>
              <Input
                name="retypedPassword"
                onChange={(e) => handleChange(e, setCredentials)}
                type="password"
                id="email"
                placeholder="Repeat password"
              />
            </div>

            <Button size={"sm"} variant={"outline"}>
              {" "}
              Sign up
            </Button>
          </section>
          <a className="text-blue-600 underline mt-22" href="/">
            Go to Log In
          </a>
        </form>
      </main>
    </div>
  );
};

export default signUp;
