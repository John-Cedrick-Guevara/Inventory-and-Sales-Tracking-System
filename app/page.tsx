import Image from "next/image";
import logo from "./Assets/images/logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="">
      <form
        action=""
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
            <Input type="email" id="email" placeholder="Email" />
          </div>

          {/* password */}
          <div className="grid w-full max-w-xs items-center gap-1">
            <Label htmlFor="email">Password</Label>
            <Input type="password" id="email" placeholder="Password" />
          </div>

          <Button size={"sm"} variant={"outline"}>
            {" "}
            Log In
          </Button>
        </section>

        <a className="text-blue-600 underline mt-22" href="/sign-up">
          Go to Sign Up
        </a>
      </form>
    </main>
  );
}
