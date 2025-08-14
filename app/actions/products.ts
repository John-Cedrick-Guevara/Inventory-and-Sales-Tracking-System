"use server";
import prisma from "@/lib/prisma";

// handles product creation
export async function addProduct(prevState: unknown, formData: FormData) {
  const name = formData.get("product-name") as string;
  const description = formData.get("product-description") as string;
  const price = formData.get("product-price");
  const stock = formData.get("product-stock") as string;
  const image = formData.get("product-image") as File;
  const category = formData.get("category");

  // checks for empty fields
  if (!name || !description || !price || !stock || !image || !category)
    throw new Error("Missing fields");

  // convert image file into unit8 array
  const arrayBuffer = await image.arrayBuffer();
  const convertedImage = Buffer.from(arrayBuffer); //Uint8Array<ArrayBufferLike>
  
  // adds data to the database
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

// handles product edit
export async function editProduct(prevState: unknown, formData: FormData) {
  const id = formData.get("id");

  // fields to be edited
  const data: Record<string, any> = {};

  // sets the field to be edited
  for (const [rawKey, value] of formData.entries()) {
    if (rawKey === "id") continue; // skip id

    if (value instanceof File) {
      if (value.size > 0) { //checks if file is empty
        const arrayBuffer = await value.arrayBuffer();
        const convertedImage = Buffer.from(arrayBuffer); //Uint8Array<ArrayBufferLike>

        data.image = convertedImage;
      }

    } else if (typeof value === "string") {
      if (value.trim() === "") continue; // skips the fields that is not edited
      else {
        data[rawKey] = value; // add the edited fields
      }
    }
  }
// returns error message if no data
  if (!data) {
    return { success: false, error: "NO fields to update" };
    
  }
  const editedProduct = await prisma.product.update({
    where: {
      id: Number(id),
    },

    data,
  });

  return editedProduct;
}
