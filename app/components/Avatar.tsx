import Image from "next/image";

interface AvatarProps {
  image?: string | null;
  name?: string | null;
  size?: number;
}

const Avatar = ({ image, name, size = 40 }: AvatarProps) => {
  if (image) {
    return (
      <div
        className="relative overflow-hidden rounded-full"
        style={{ width: size, height: size }}
      >
        <Image src={image} alt={name || "User"} fill className="object-cover" />
      </div>
    );
  }

  // 이미지가 없을 때 초기 표시
  const initials = name
    ? name
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
