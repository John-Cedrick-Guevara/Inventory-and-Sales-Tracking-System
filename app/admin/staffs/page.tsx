"use client";
import TableComponent from "@/components/Table";
import { Users } from "@/lib/interfaces";
import useSWR from "swr";
import React from "react";
import { fetcher } from "@/lib/fetcher";

const staffs = () => {
  const { data, error, isLoading } = useSWR<Users[]>("/api/users/", fetcher);

  return (
    <div className="w-full">
      <TableComponent
        title={isLoading ? "fetching users" : "Staffs"}
        tableHead={["userId", "name", "email", "role", "sales"]}
        tableItems={["id", "name", "email", "role", "sales"] as (keyof Users)[]}
        data={data ?? []}
      ></TableComponent>
    </div>
  );
};

export default staffs;
