import Avatar from "@/app/components/Avatar";
import { formatTime } from "@/app/libs/dayjs";
import { IoChevronBack, IoEllipsisVertical } from "react-icons/io5";

interface ChatHeaderProps {
  setLayout: (layout: boolean) => void;
  receiverName: string;
  receiverImage: string;
  lastMessageTime: Date | undefined;
}

const ChatHeader = ({
  setLayout,
  receiverName,
  receiverImage,
  lastMessageTime,
}: ChatHeaderProps) => {
  return (
    <div className="flex-shrink-0 sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side - Back button and user info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLayout(false)}
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200"
          >
            <IoChevronBack className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="ring-2 ring-orange-100 rounded-full">
                <Avatar image={receiverImage} name={receiverName} />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div className="flex flex-col">
              <h2 className="text-base font-semibold text-gray-800">
                {receiverName}
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-500">
                  {lastMessageTime
                    ? `마지막 활동 ${formatTime(lastMessageTime)}`
                    : "온라인"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - More options */}
        <button className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200">
          <IoEllipsisVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
