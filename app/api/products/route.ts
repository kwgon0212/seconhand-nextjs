import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await req.json();

  const { title, description, category, lat, lng, imgSrc, price } = body;

  Object.keys(body).forEach((value) => {
    if (!body[value]) return NextResponse.error();
  });

  const product = await prisma.product.create({
    data: {
      title,
      description,
      category,
      lat,
      lng,
      imgSrc,
      price: Number(price),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(product);
};
