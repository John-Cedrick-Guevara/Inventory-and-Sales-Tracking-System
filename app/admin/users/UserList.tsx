"use client";
import { Input } from "@/components/ui/input";
import { Users } from "@/lib/interfaces";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Label } from "@/components/ui/label";
import {
  Ellipsis,
  Loader2,
  PencilLineIcon,
  Plus,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { useActionState } from "react";
import { signUpAction } from "@/app/actions/auth";
import { updateUser } from "@/app/actions/user";
import axios from "axios";
import Link from "next/link";
import RefreshButton from "@/components/RefreshButton";

export function UserList({ users }: { users: Users[] }) {
  const [data, action, isPending] = useActionState(signUpAction, undefined);
  const [dataUpdate, actionUpdate, isPendingUpdate] = useActionState(
    updateUser,
    undefined
  );

  // handles delete user
  async function handleDeleteUser(id: number) {
    try {
      await axios.delete(`/api/users/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* table */}
      <section className="rounded-xl border-gray-300 shadow-sm ">
        {/* header */}
        <div className="flex items-center justify-between px-4 py-2 gap-2">
          <h1 className="font-medium text-2xl">Users List</h1>

          {/* create new user */}
          <Dialog>
            <DialogTrigger asChild className="ml-auto">
              <Button
                variant="outline"
                className="text-white bg-blue-600 hover:none"
              >
                <Plus />
                Create new User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create new staff</DialogTitle>
                <DialogDescription>
                  Create new staff here. Click submit when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4" action={action}>
                <div className="grid gap-3">
                  <Label htmlFor="name">Username</Label>
                  <Input required id="name" name="name" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" required id="email" name="email" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input required id="password" name="password" />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    className="bg-blue-700 text-white hover:bg-blue-600"
                    type="submit"
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Input className="max-w-sm" />
          <RefreshButton />
        </div>

        {users.map((user, index) => (
          <div
            key={index}
            className="border-t p-2 px-4 border-t-gray-200 grid grid-rows-[1fr_auto] grid-cols-[30px_1fr_auto]"
          >
            <h1 className="text-md  row-span-2 self-center ">{user.id}</h1>
            <h1 className="text-lg font-semibold">{user.name}</h1>

            <div className="flex gap-2 self-center row-span-2">
              {/* edit user dialog */}
              <Dialog>
                <DialogTrigger className="ml-auto">
                  <PencilLineIcon
                    width={35}
                    height={35}
                    className="bg-blue-100 text-blue-700 p-1 rounded-md cursor-pointer"
                  />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit staff credentials</DialogTitle>
                    <DialogDescription>
                      Edit user's credentials here. Only change the fields to be
                      edited. Click save when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4" action={actionUpdate}>
                    <Input
                      required
                      id="id"
                      name="id"
                      type="hidden"
                      value={user.id}
                    />
                    <div className="grid gap-3">
                      <Label htmlFor="name">Username</Label>
                      <Input id="name" name="name" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" name="email" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        className="bg-blue-700 text-white hover:bg-blue-600"
                        type="submit"
                      >
                        {isPendingUpdate ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              {/* delete user dialog */}
              <AlertDialog>
                <AlertDialogTrigger>
                  <Trash2
                    width={35}
                    height={35}
                    className="bg-red-100 text-red-700 p-1 rounded-md cursor-pointer"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure to delete {user.name}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      {user.name}'s account and remove data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-700 text-white hover:bg-red-800"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <h3 className="text-sm font-medium text-blue-400">{user.email}</h3>
          </div>
        ))}
      </section>

      
    </>
  );
}
