"use server"
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
