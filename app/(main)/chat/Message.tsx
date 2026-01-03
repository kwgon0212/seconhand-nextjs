import Avatar from "@/app/components/Avatar";
import { fromNow } from "@/app/libs/dayjs";
import clsx from "clsx";

interface MessageProps {
  isSender: boolean;
  messageText: string | null;
  messageImage: string | null;
  receiverName: string;
  receiverImage: string;
  senderImage: string | null;
  time: Date;
}

const Message = ({
  isSender,
  messageText,
  messageImage,
  receiverName,
  receiverImage,
  senderImage,
  time,
}: MessageProps) => {
  return (
    <div
      className={clsx(
        "flex gap-3 max-w-[85%] md:max-w-[70%]",
        isSender ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {/* Avatar - only show for receiver */}
      {!isSender && (
        <div className="flex-shrink-0 self-end">
          <Avatar image={receiverImage} name={receiverName} />
        </div>
      )}

      {/* Message content */}
      <div
        className={clsx(
          "flex flex-col gap-1",
          isSender ? "items-end" : "items-start"
        )}
      >
        {/* Name - only show for receiver */}
        {!isSender && (
          <span className="text-xs font-medium text-gray-600 ml-1">
            {receiverName}
          </span>
        )}

        {/* Message bubble */}
        {messageText && (
          <div
            className={clsx(
              "relative px-4 py-2.5 rounded-2xl shadow-sm transition-all",
              isSender
                ? "bg-linear-to-br from-orange-500 to-amber-500 text-white rounded-br-md"
                : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
            )}
          >
            <p className="text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">
              {messageText}
            </p>
          </div>
        )}

        {/* Image message */}
        {messageImage && (
          <div
            className={clsx(
              "relative rounded-2xl overflow-hidden shadow-sm",
              isSender ? "rounded-br-md" : "rounded-bl-md"
            )}
          >
            <img
              src={messageImage}
              alt="message"
              className="max-w-xs max-h-60 object-cover"
            />
          </div>
        )}

        {/* Time */}
        <span
          className={clsx(
            "text-[10px] text-gray-400 px-1",
            isSender ? "text-right" : "text-left"
          )}
        >
          {fromNow(time)}
        </span>
      </div>
    </div>
  );
};

export default Message;
