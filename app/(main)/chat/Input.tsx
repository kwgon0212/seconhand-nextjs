import { previewImg } from "@/app/libs/previewImg";
import { uploadImg } from "@/app/libs/uploadImg";
import axios from "axios";
import clsx from "clsx";
import Image from "next/image";
import { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoImageOutline, IoSend } from "react-icons/io5";
import useSWRMutation from "swr/mutation";

interface InputProps {
  receiverId: string;
  currentUserId: string;
}

const Input = ({ receiverId, currentUserId }: InputProps) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [img, setImg] = useState<File | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const sendReq = async (
    url: string,
    {
      arg,
    }: {
      arg: {
        text: string;
        image: string;
        receiverId: string;
        senderId: string;
      };
    }
  ) => {
    const res = await axios.post(url, arg);
    return res.data;
  };

  const { trigger, isMutating } = useSWRMutation("/api/chat", sendReq);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imgUrl = img ? await uploadImg(img) : null;

    if (message.trim() || imgUrl) {
      try {
        trigger({
          text: message,
          image: imgUrl,
          receiverId: receiverId,
          senderId: currentUserId,
        });
      } catch (error) {
        console.log(error);
      }
    }

    setImg(null);
    setImgPreview(null);
    setMessage("");
  };

  const chooseImg = () => {
    imgRef.current?.click();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "relative flex items-center gap-2 p-2 bg-gray-50 rounded-2xl border-2 transition-all duration-200",
        isFocused
          ? "border-orange-300 bg-white shadow-lg shadow-orange-100"
          : "border-transparent"
      )}
    >
      {imgPreview && (
        <div className="absolute bottom-full right-0 mb-3 w-40 h-40 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl animate-in fade-in slide-in-from-bottom-2">
          <img
            src={imgPreview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setImgPreview(null);
              setImg(null);
            }}
            className="absolute top-2 right-2 cursor-pointer flex items-center justify-center p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all shadow-sm"
          >
            <CgClose size={14} />
          </button>
        </div>
      )}
      {/* Image upload button */}
      <button
        onClick={chooseImg}
        className="shrink-0 flex items-center justify-center w-10 h-10 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-200 cursor-pointer"
      >
        <IoImageOutline className="ml-2 cursor-pointer" />
        <input
          type="file"
          className="hidden"
          ref={imgRef}
          accept="image/*"
          multiple={false}
          onChange={(e) => previewImg(e, setImgPreview, setImg)}
        />
      </button>

      {/* Text input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 py-2.5 px-2 bg-transparent text-gray-800 placeholder-gray-400 text-sm outline-none"
        placeholder="메시지를 입력하세요..."
      />

      {/* Send button */}
      <button
        type="submit"
        disabled={(!message.trim() && !img) || isMutating}
        className={`
          shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
          ${
            message.trim() || img
              ? "bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-md hover:shadow-lg hover:scale-105"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
          ${isMutating ? "opacity-50 cursor-wait" : ""}
        `}
      >
        <IoSend
          className={`w-5 h-5 ${message.trim() || img ? "-rotate-45" : ""}`}
        />
      </button>
    </form>
  );
};

export default Input;
