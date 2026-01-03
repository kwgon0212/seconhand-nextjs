import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const users = await prisma.user.findMany({
    include: {
      conversations: {
        include: {
          messages: {
            include: {
              sender: true,
              receiver: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          users: true,
        },
      },
    },
  });

  return NextResponse.json(users);
};

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await req.json();

  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        { users: { some: { id: body.senderId } } },
        { users: { some: { id: body.receiverId } } },
      ],
    },
  });

  if (conversation) {
    // 이미 톡방이 있는경우 메시지만 추가하기
    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: conversation.id,
        },
      });

      return NextResponse.json(message);
    } catch (error) {
      return NextResponse.json(error);
    }
  } else {
    // 처음 대화하는 경우, 톡방 + 메세지 추가
    const newConv = await prisma.conversation.create({
      data: {
        senderId: body.senderId,
        receiverId: body.receiverId,
        users: {
          connect: [{ id: body.senderId }, { id: body.receiverId }],
        },
      },
    });

    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: newConv.id,
        },
      });

      return NextResponse.json(message);
    } catch (error) {
      return NextResponse.json(error);
    }
  }
};
