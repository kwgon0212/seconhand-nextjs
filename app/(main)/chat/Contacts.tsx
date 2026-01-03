import { TUserWithChat } from "@/types";
import User from "./User";
import { IoChatbubblesOutline, IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

interface ContactsProps {
  users: TUserWithChat[];
  currentUser: TUserWithChat;
  setLayout: (layout: boolean) => void;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const Contacts = ({
  users,
  currentUser,
  setLayout,
  setReceiver,
}: ContactsProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterMessages = (
    userId: string,
    userName: string | null,
    userImage: string | null
  ) => {
    setReceiver({
      receiverId: userId,
      receiverName: userName || "",
      receiverImage: userImage || "",
    });
  };

  const filteredUsers = users
    .filter((user) => user.id !== currentUser?.id)
    .filter((user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm">
            <IoChatbubblesOutline className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">채팅</h1>
            <p className="text-xs text-orange-100">
              {filteredUsers.length}명의 대화 상대
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="relative">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="대화 상대 검색..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  setLayout(true);
                  filterMessages(user.id, user.name, user.image);
                }}
              >
                <User user={user} currentUserId={currentUser?.id} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12 px-4">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
              <IoChatbubblesOutline className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-center">
              {searchQuery
                ? "검색 결과가 없습니다"
                : "아직 대화 상대가 없습니다"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
