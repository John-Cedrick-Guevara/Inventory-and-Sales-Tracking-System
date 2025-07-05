import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Categories

// gets categories
export async function GET() {
  try {
    const cathegories = await prisma.category.findMany();

    return NextResponse.json(cathegories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fethcing cathegories" },
      { status: 500 }
    );
  }
}

// handles creation of new category
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body.data;
  try {
    const newCathegory = await prisma.category.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json(newCathegory, { status: 200 });
  } catch (error) {
    return NextResponse.json("failed to create new cathegory", { status: 500 });
  }
}

// handles data edit of category
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { name, id } = body.data;
  try {
    const editedCathegory = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json(editedCathegory, { status: 200 });
  } catch (error) {
    return NextResponse.json("failed to create new cathegory", { status: 500 });
  }
}
// handles deletion of category
export async function DELETE(req: NextRequest) {
  const id = await req.json();

  try {
    const deletedCathegory = await prisma.category.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Cathegory Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json("failed to create new cathegory", { status: 500 });
  }
}
