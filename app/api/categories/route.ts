import prisma from "@/lib/prisma";

export async function GET() {
  try {
   
    const categories = await prisma.category.findMany();
    return Response.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return Response.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
