"use client";
import { Users } from "@/lib/interfaces";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { AddUser, DelteAlertDialog, EditUser } from "./UserDialog";
import ListHeader from "@/components/ListHeader";
import { filterSearch } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { pageLimit } from "@/lib/constants";
import PaginationControl from "@/components/PaginationControl";

export function UserList() {
  // search parameters
  const [searchUser, setSearchUser] = useState("");

  // data and loading state
  const [staff, setStaff] = useState<Users[]>([]);
  const [loading, setLoading] = useState(true);

  // pagination current page and total pages
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  
  // fether
  const fetchStaff = async () => {
    try {
      const res = await axios.get(`/api/users?limit=${pageLimit}&page=${page}`);

      setStaff(res.data.data);
      setTotalPage(res.data.totalPage);
    } catch (err) {
      console.error("Error fetching staff:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [page]);

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
      <PaginationControl toalPage={totalPage} page={page} setPage={setPage} />
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
