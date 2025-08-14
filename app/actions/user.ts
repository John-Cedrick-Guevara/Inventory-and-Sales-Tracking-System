"use server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/utils";

export async function updateUser(prevState: unknown, formData: FormData) {
  const email = ((formData.get("email") as string) || "").trim().toLowerCase();
  let password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const id = Number(formData.get("id"));

  // returns error if no id
  if (!id) return { success: false, error: "Id is required." };

  // fields to be updated
  const data: any = {};
  for (const [rawKey, value] of formData.entries()) {
    if (rawKey === "id") continue; // skip id
    if(typeof value === "string" ) {
      if (value.trim() === "") continue; // skips the fields that is not edited
        else {
          if(rawKey === "password") {
          data[rawKey] = await hashPassword(value);; // add the edited fields
          }
          else  {
            data[rawKey] = value; // add the edited fields
          }
        }
      }
  }


  if (Object.keys(data).length === 0) {
    // nothing to update
      if (!id) return { success: false, error: "No received fields to be updated." };

  }

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });

  return updatedUser;
}
