import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  label: string;
  selected?: boolean;
  icon: IconType;
  path: string;
}

const CategoryBox = ({
  label,
  selected,
  icon: Icon,
  path,
}: CategoryBoxProps) => {
  return (
    <Link
      href={`/?category=${path}`}
      className={clsx(
        "group flex items-center justify-center gap-2 px-4 py-2 rounded-xl",
        "min-w-[100px] transition-all duration-200",
        "hover:scale-105 active:scale-95",
        "border-2 will-change-transform",
        selected
          ? "bg-blue-50 border-blue-500 text-blue-700 shadow-md shadow-blue-500/20"
          : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600"
      )}
    >
      <div
        className={clsx(
          "p-2 rounded-lg transition-colors duration-200",
          selected ? "bg-blue-100" : "bg-gray-50 group-hover:bg-blue-100"
        )}
      >
        <Icon
          size={24}
          className={clsx(
            "transition-colors duration-200",
            selected
              ? "text-blue-600"
              : "text-gray-500 group-hover:text-blue-600"
          )}
        />
      </div>
      <div
        className={clsx(
          "text-xs font-medium text-center transition-colors duration-200",
          selected ? "text-blue-700" : "text-gray-600"
        )}
      >
        {label}
      </div>
    </Link>
  );
};

export default CategoryBox;
