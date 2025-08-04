"use client";
import { Users } from "@/lib/interfaces";
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
import { useMemo, useState } from "react";
import axios from "axios";
import { AddUser, EditUser } from "./UserDialog";
import ListHeader from "@/components/ListHeader";
import { filterSearch } from "@/lib/utils";

export function UserList({ users }: { users: Users[] }) {
  const [searchUser, setSearchUser] = useState("");

  const filteredUsers: Users[] = useMemo(
    () => filterSearch(searchUser, users),
    [searchUser, users]
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
    <section>
      {/* header */}
      <ListHeader
        searchQuery={searchUser}
        setSearchQuery={setSearchUser}
        title={"User"}
        AddDialog={<AddUser />}
      />

      <div className="rounded-xl border border-gray-200 shadow-sm mt-8 ">
        <div className="p-2 px-4">
          <h1 className="text-lg font-medium">Staffs</h1>
        </div>
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="border-t p-2 px-4 border-t-gray-200 grid grid-rows-[1fr_auto] grid-cols-[30px_1fr_auto]"
          >
            <h1 className="text-md  row-span-2 self-center ">{user.id}</h1>
            <h1 className="text-lg font-semibold">{user.name}</h1>

            <div className="flex gap-2 self-center row-span-2">
              {/* edit user dialog */}
              <EditUser id={user.id} />

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
      </div>
    </section>
  );
}
