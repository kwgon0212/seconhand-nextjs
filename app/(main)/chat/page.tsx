import ChatClient from "./ChatClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

const ChatPage = async () => {
  const currentUser = await getCurrentUser();
  return <ChatClient currentUser={currentUser} />;
};

export default ChatPage;
