import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "1h"; // adjust as needed

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export function createToken(payload: { userId: number }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    email: string;
    iat: number;
    exp: number;
  };
}
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string; // e.g. "data:image/avif;base64,...."
      const b64 = result.split(",", 2)[1];
      resolve(b64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const filterSearch = (search: string, list: any) => {
  if (!search) return list;
  console.log("filterSearch called with:", {
    search,
    listLength: list?.length,
  });
  try {
    const result = list.filter(
      (item: any) =>
        item.name && item.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log("filterSearch result:", result);
    return result;
  } catch (error) {
    console.error("Error in filterSearch:", error);
    return list;
  }
};

export const categorizedFilter = (search: string, list: any) => {
  if (!search) return list;
  console.log("categorizedFilter called with:", {
    search,
    listLength: list?.length,
  });
  try {
    const result = list.filter(
      (item: any) =>
        item.category && Number(item.category.id) === Number(search)
    );
    console.log("categorizedFilter result:", result.length);
    return result;
  } catch (error) {
    console.error("Error in categorizedFilter:", error);
    return list;
  }
};
