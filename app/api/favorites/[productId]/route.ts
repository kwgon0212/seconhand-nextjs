import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

interface Params {
  productId?: string;
}

export const POST = async (
  req: Request,
  { params }: { params: Promise<Params> }
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { productId } = await params;

  if (!productId || typeof productId !== "string")
    throw new Error("Invalid ID");

  const favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(productId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
};
export const DELETE = async (
  req: Request,
  { params }: { params: Promise<Params> }
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { productId } = await params;

  if (!productId || typeof productId !== "string")
    throw new Error("Invalid ID");

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== productId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
};
