import Image from "next/image";
import { User } from "@prisma/client";

interface AvatarProps {
  user: User;
  size?: number;
}

const Avatar = ({ user, size = 40 }: AvatarProps) => {
  if (user.image) {
    return (
      <div className="relative overflow-hidden rounded-full" style={{ width: size, height: size }}>
        <Image
          src={user.image}
          alt={user.name || "User"}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  // 이미지가 없을 때 초기 표시
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div
      className="rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
};

export default Avatar;

