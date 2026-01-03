"use client";

import { TUserWithChat } from "@/types";
import { User } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { useState } from "react";
import useSWR from "swr";
import Contacts from "./Contacts";
import Chat from "./Chat";
import { IoChatbubblesOutline } from "react-icons/io5";

interface ChatClientProps {
  currentUser: User | null;
}

const ChatClient = ({ currentUser }: ChatClientProps) => {
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });
  const [layout, setLayout] = useState(false);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const {
    data: users,
    error,
    isLoading,
  } = useSWR("/api/chat", fetcher, {
    refreshInterval: 1000,
  });

  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.email === currentUser?.email
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-56px)] bg-linear-to-br from-orange-50 to-amber-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent rounded-full border-t-orange-500 animate-spin"></div>
          </div>
          <p className="text-gray-500 font-medium">채팅을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-56px)] bg-linear-to-br from-orange-50 to-amber-50">
        <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full">
            <span className="text-3xl">!</span>
          </div>
          <p className="text-gray-600 font-medium">
            채팅을 불러오는데 실패했습니다
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="h-[calc(100vh-56px)] bg-linear-to-br from-orange-50 via-white to-amber-50">
      <div className="h-full max-w-7xl mx-auto md:p-4">
        <div className="h-full grid grid-cols-[1fr] md:grid-cols-[320px_1fr] bg-white md:rounded-2xl md:shadow-xl overflow-hidden border border-gray-100">
          <section
            className={clsx(
              "md:flex md:border-r border-gray-100 h-full overflow-hidden",
              layout && "hidden"
            )}
          >
            <Contacts
              users={users}
              currentUser={currentUserWithMessage}
              setLayout={setLayout}
              setReceiver={setReceiver}
            />
          </section>
          <section
            className={clsx(
              "md:flex h-full overflow-hidden",
              !layout && "hidden"
            )}
          >
            {receiver.receiverId ? (
              <Chat
                currentUser={currentUserWithMessage}
                receiver={receiver}
                setLayout={setLayout}
              />
            ) : (
              <div className="hidden md:flex flex-col items-center justify-center w-full h-full bg-linear-to-br from-gray-50 to-orange-50/30">
                <div className="flex flex-col items-center gap-4 p-8">
                  <div className="w-24 h-24 flex items-center justify-center bg-orange-100 rounded-full">
                    <IoChatbubblesOutline className="w-12 h-12 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    대화를 시작해보세요
                  </h3>
                  <p className="text-gray-500 text-center max-w-xs">
                    왼쪽 목록에서 대화할 상대를 선택하면
                    <br />
                    메시지를 주고받을 수 있어요
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ChatClient;
