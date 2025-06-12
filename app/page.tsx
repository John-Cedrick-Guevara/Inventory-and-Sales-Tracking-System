"use client";
import Image from "next/image";
import logo from "./Assets/images/logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./Context/AuthContext";

export default function Home() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    action: "logIn",
    email: "",
    password: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const user = await axios.post("/api/users", credentials);
      router.push(`/${user.data.role === "ADMIN" ? "admin" : "staff"}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="">
      <form
        action=""
        onSubmit={handleSignIn}
        className="h-full flex flex-col gap-10 items-center justify-start"
      >
        <h1 className="font-bold text-3xl mb-12">Log In</h1>
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
              onChange={handleChange}
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>

          {/* password */}
          <div className="grid w-full max-w-xs items-center gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              onChange={handleChange}
              type="password"
              id="passsword"
              placeholder="Password"
            />
          </div>

          <Button size={"sm"} variant={"outline"}>
            {" "}
            Log In
          </Button>
        </section>

        <a className="text-blue-600 underline mt-22" href="/auth/sign-up">
          Go to Sign Up
        </a>
      </form>
    </main>
  );
}
