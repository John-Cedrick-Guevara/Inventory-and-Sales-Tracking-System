import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  showForm: boolean;
}

const AddUserForm = ({ showForm }: Props) => {
  return (
    <div
      className={`w-full scale-0 h-full absolute top-0 right-0 flex items-center justify-center mx-auto transition-all  z-30 ${
        showForm && "scale-100  bg-slate-300/70"
      }`}
    >
      <form
        action=""
        // onSubmit={handleSignIn}
        className=" flex flex-col gap-10 items-center justify-start bg-slate-600 h-fit p-10 w-full max-w-lg rounded-lg"
      >
        <h1 className="font-bold text-3xl mb-12">Log In</h1>

        {/* input fields */}
        <section className="w-full max-w-xs flex flex-col gap-4 items-center">
          {/* email */}
          <div className="grid w-full max-w-xs items-center gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              // onChange={handleChange}
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
              // onChange={handleChange}
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
    </div>
  );
};

export default AddUserForm;
