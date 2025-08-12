"use client";
import { Users } from "@/lib/interfaces";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { AddUser, DelteAlertDialog, EditUser } from "./UserDialog";
import ListHeader from "@/components/ListHeader";
import { filterSearch } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function UserList() {
  const [searchUser, setSearchUser] = useState("");

  const [staff, setStaff] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("/api/users");
        setStaff(res.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const filteredUsers: Users[] = useMemo(
    () => filterSearch(searchUser, staff),
    [searchUser, staff]
  );

  return (
    <section className="h-[100vh]">
      {/* header */}
      <ListHeader
        searchQuery={searchUser}
        setSearchQuery={setSearchUser}
        title={"User"}
        AddDialog={<AddUser />}
      />

      <div className="rounded-xl border border-gray-200 shadow-sm mt-8 dark:bg-gray-800">
        <div className="p-2 px-4">
          <h1 className="text-lg font-medium">Staffs</h1>
        </div>
        {loading ? (
          <div className="p-2">
            <Skeleton className="h-[100px] "></Skeleton>
          </div>
        ) : (
          filteredUsers.map((user, index) => (
            <StaffRow user={user} key={index} />
          ))
        )}
      </div>
    </section>
  );
}

export function StaffRow({ user }: { user: Users }) {
  return (
    <div className="border-t p-2 px-4 border-t-gray-200 grid grid-rows-[1fr_auto] grid-cols-[30px_1fr_auto]">
      <h1 className="text-md  row-span-2 self-center ">{user.id}</h1>
      <h1 className="text-lg font-semibold">{user.name}</h1>

      <div className="flex gap-2 self-center row-span-2">
        {/* edit user dialog */}
        <EditUser id={user.id} />
        {/* delete user */}
        <DelteAlertDialog name={user.name} id={user.id} />
      </div>

      <h3 className="text-sm font-medium text-blue-400">{user.email}</h3>
    </div>
  );
}
