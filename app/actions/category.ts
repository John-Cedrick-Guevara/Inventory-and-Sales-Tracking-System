"use server"
import prisma from "@/lib/prisma";

export async function addCategory(preState: unknown, formData: FormData) {
  const name = formData.get("name") as string;

  if (!name) throw new Error("Category name is required.");

  const newCategory = await prisma.category.create({
    data: {
      name: name,
    },
  });

  return newCategory;
}
export async function editCategory(preState: unknown, formData: FormData) {
  const id = formData.get("id");
  const newName = formData.get("new-name") as string;

  if (!id || !newName) throw new Error("Category id and new name is required.");

  const newCategory = await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name: newName,
    },
  });

  return newCategory;
}
