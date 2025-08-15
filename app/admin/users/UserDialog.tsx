"use client";
import React, { useActionState } from "react";
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
import { Label } from "@/components/ui/label";
import { Loader2, PencilLineIcon, Plus } from "lucide-react";
import { signUpAction } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/app/actions/user";
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
import { Trash2 } from "lucide-react";
import axios from "axios";

export const AddUser = () => {
  const [data, action, isPending] = useActionState(signUpAction, undefined);

  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto">
        <Button variant="outline" className="text-white bg-blue-600 hover:none">
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
  );
};

export const EditUser = ({ id }: { id: number }) => {
  const [dataUpdate, actionUpdate, isPendingUpdate] = useActionState(
    updateUser,
    undefined
  );

  return (
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
            Edit user's credentials here. Only change the fields to be edited.
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4" action={actionUpdate}>
          <Input required id="id" name="id" type="hidden" value={id} />

          {/* user name */}
          <div className="grid gap-3">
            <Label htmlFor="name">Username</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Staff name"
              defaultValue={""}
            />
          </div>

          {/* email */}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" />
          </div>

          {/* password */}
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
  );
};

export const DelteAlertDialog = ({
  id,
  name,
  handleDeleteUser
}: {
  id: number;
  name: string;
  handleDeleteUser : (id: number | undefined) => void;
}) => {

  return (
    <>
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
              Are you absolutely sure to delete {name}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              {name}'s account and remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-700 text-white hover:bg-red-800"
              onClick={() => handleDeleteUser(id)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
