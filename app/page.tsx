"use client";
import Image from "next/image";
import logo from "./Assets/images/logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleChange } from "@/lib/handleChange";
import { signUpSchema } from "@/lib/schemas";
import FormError from "@/components/FormError";

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [credentials, setCredentials] = useState({
    action: "logIn",
    email: "",
    password: "",
  });

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedData = signUpSchema.safeParse(credentials);
    if (parsedData.success) {
      try {
        const user = await axios.post("/api/users", parsedData.data);
        router.push(`/${user.data.role === "ADMIN" ? "admin" : "staff"}`);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const message =
            (error.response?.data.message as string) ||
            "Something went wrong. Please wait";
          setError(message);
        } else {
          setError("An unexpected error occured");
        }
      }
    } else {
      setError(parsedData.error.issues[0].message);
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
          {/* error message  */}
          <FormError error={error} setError={setError} />

          {/* email */}
          <div className="grid w-full max-w-xs items-center gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              onChange={(e) => handleChange(e, setCredentials)}
              type="email"
              id="email"
              placeholder="Email"
              value={credentials.email}
            />
          </div>

          {/* password */}
          <div className="grid w-full max-w-xs items-center gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              onChange={(e) => handleChange(e, setCredentials)}
              type="password"
              id="passsword"
              value={credentials.password}
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
