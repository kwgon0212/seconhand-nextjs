import { TUserWithChat } from "@/types";
import Input from "./Input";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import { useEffect, useRef } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";

interface ChatProps {
  currentUser: TUserWithChat;
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
  setLayout: (layout: boolean) => void;
}

const Chat = ({ currentUser, receiver, setLayout }: ChatProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const conversation = currentUser?.conversations?.find((conv) =>
    conv.users.find((user) => user.id === receiver.receiverId)
  );

  const messageLength = conversation?.messages.length;

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messageLength, receiver.receiverId]);

  if (!receiver.receiverName || !currentUser) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-linear-to-br from-gray-50 to-orange-50/30">
        <div className="flex flex-col items-center gap-4 p-8">
          <div className="w-24 h-24 flex items-center justify-center bg-orange-100 rounded-full">
            <IoChatbubblesOutline className="w-12 h-12 text-orange-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700">
            대화를 시작해보세요
          </h3>
          <p className="text-gray-500 text-center max-w-xs">
            목록에서 대화할 상대를 선택하면
            <br />
            메시지를 주고받을 수 있어요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Header */}
      <ChatHeader
        setLayout={setLayout}
        receiverName={receiver.receiverName}
        receiverImage={receiver.receiverImage}
        lastMessageTime={
          conversation?.messages
            .filter((message) => message.receiverId === currentUser.id)
            .at(-1)?.createdAt
        }
      />

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 overscroll-contain"
      >
        {conversation && conversation.messages.length > 0 ? (
          conversation.messages.map((message) => (
            <Message
              key={message.id}
              isSender={message.senderId === currentUser.id}
              messageText={message.text}
              messageImage={message.image}
              receiverName={receiver.receiverName}
              receiverImage={receiver.receiverImage}
              senderImage={currentUser.image}
              time={message.createdAt}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm border border-orange-100">
              <p className="text-gray-500 text-sm text-center">
                <span className="font-medium text-orange-500">
                  {receiver.receiverName}
                </span>
                님과의 대화를 시작해보세요
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="shrink-0 p-4 bg-white border-t border-gray-100">
        <Input
          receiverId={receiver.receiverId}
          currentUserId={currentUser.id}
        />
      </div>
    </div>
  );
};

export default Chat;
