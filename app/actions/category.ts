"use server"
import prisma from "@/lib/prisma";
import { fa } from "zod/v4/locales";

// handle cration of new category 
export async function addCategory(preState: unknown, formData: FormData) {
  const name = formData.get("name") as string;

  // checks null field
  if (!name)   return { success: false, error: "Category name required." };

  // database action
  const newCategory = await prisma.category.create({
    data: {
      name: name,
    },
  });

  return newCategory;
}

// handles edit category name
export async function editCategory(preState: unknown, formData: FormData) {
  const id = formData.get("id");
  const newName = formData.get("new-name") as string;

  // checks for null values
  if (!id || !newName) 
  return { success: false, error: "Category id and new name is required." };
    

  // database action
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
