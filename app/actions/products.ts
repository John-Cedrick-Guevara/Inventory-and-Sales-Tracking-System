"use server";
import prisma from "@/lib/prisma";
import { fileToBase64 } from "@/lib/utils";
import { connect } from "http2";
import { id } from "zod/v4/locales";

export async function addProduct(prevState: unknown, formData: FormData) {
  const name = formData.get("product-name") as string;
  const description = formData.get("product-description") as string;
  const price = formData.get("product-price");
  const stock = formData.get("product-stock") as string;
  const image = formData.get("product-image") as File;
  const category = formData.get("category");

  if (!name || !description || !price || !stock || !image || !category)
    throw new Error("Missing fields");

  const arrayBuffer = await image.arrayBuffer();
  const convertedImage = Buffer.from(arrayBuffer); //Uint8Array<ArrayBufferLike>
  console.log(category);
  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      image: convertedImage,
      category: {
        connect: {
          id: Number(category),
        },
      },
    },
  });

  return newProduct;
}

export async function editProduct(prevState: unknown, formData: FormData) {
  const id = formData.get("id");
  // const name = formData.get("product-name") as string;
  // const description = formData.get("product-description") as string;
  // const price = formData.get("product-price");
  // const stock = formData.get("product-stock") as string;
  // const image = formData.get("product-image") as File;
  // const category = formData.get("category");

  // if (!id) throw new Error("Id is required");

  // const arrayBuffer = await image.arrayBuffer();
  // const convertedImage = Buffer.from(arrayBuffer); //Uint8Array<ArrayBufferLike>

  // console.log(formData);
  const data: Record<string, any> = {};
  for (const [rawKey, value] of formData.entries()) {
    if (rawKey === "id") continue;

    if (value instanceof File) {
      if (value.size > 0) {
        const arrayBuffer = await value.arrayBuffer();
        const convertedImage = Buffer.from(arrayBuffer); //Uint8Array<ArrayBufferLike>

        data.image = convertedImage;
      }
    } else if (typeof value === "string") {
      if (value.trim() === "") continue;
      else {
        data[rawKey] = value;
      }
    }
  }

  console.log("data", data, id);

  if (!data) {
    throw new Error("NO fields to update");
  }
  const editedProduct = await prisma.product.update({
    where: {
      id: Number(id),
    },

    data,
  });

  return editedProduct;
}
