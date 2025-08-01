// lib/getCurrentUser.ts
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/utils"; // returns payload or throws
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;

  try {
    const payload = verifyToken(token) as unknown as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        role: true,
      },
    });
    return user;
  } catch {
    return null;
  }
}

// rbac
export function requireRole(user: any, allowed: string | string[]) {
  if (!user) throw new Error("Unauthorized");
  const roles = Array.isArray(allowed) ? allowed : [allowed];
  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }
}
