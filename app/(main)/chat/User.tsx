import Avatar from "@/app/components/Avatar";
import { fromNow } from "@/app/libs/dayjs";
import { TConversation, TUserWithChat } from "@/types";

interface UserProps {
  user: TUserWithChat;
  currentUserId: string;
}

const UserComponent = ({ user, currentUserId }: UserProps) => {
  const messageWithCurrentUser = user.conversations.find(
    (conv: TConversation) =>
      conv.users.find((user) => user.id === currentUserId)
  );

  const lastMessage = messageWithCurrentUser?.messages.at(-1);

  return (
    <div className="group flex items-center gap-3 py-3 px-4 cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-200">
      {/* Avatar with online indicator */}
      <div className="relative flex-shrink-0">
        <div className="ring-2 ring-transparent group-hover:ring-orange-200 rounded-full transition-all duration-200">
          <Avatar image={user.image} name={user.name} />
        </div>
        {/* Online indicator */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
            {user.name}
          </h3>
          {lastMessage && (
            <span className="flex-shrink-0 text-xs text-gray-400">
              {fromNow(lastMessage.createdAt)}
            </span>
          )}
        </div>

        {lastMessage && (
          <p className="text-sm text-gray-500 truncate mt-0.5">
            {lastMessage.image ? "사진을 보냈습니다" : lastMessage.text}
          </p>
        )}

        {!lastMessage && (
          <p className="text-sm text-gray-400 italic mt-0.5">
            새로운 대화를 시작해보세요
          </p>
        )}
      </div>

      {/* Arrow indicator on hover */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-5 h-5 text-orange-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default UserComponent;
