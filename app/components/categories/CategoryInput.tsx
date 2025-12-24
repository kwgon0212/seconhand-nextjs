import clsx from "clsx";
import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  path: string;
  onClick: (value: string) => void;
}
const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  path,
  onClick,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(path)}
      className={clsx(
        "relative rounded-2xl border-2 py-4 px-6 flex items-center gap-4",
        "transition-all duration-200 cursor-pointer transform",
        "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
        selected
          ? "border-indigo-500 bg-linear-to-br from-indigo-50 to-purple-50 shadow-md shadow-indigo-500/20"
          : "border-gray-200 bg-white/50 hover:border-indigo-300 hover:bg-indigo-50/50"
      )}
    >
      <div
        className={clsx(
          "p-4 rounded-xl transition-colors duration-200",
          selected
            ? "bg-linear-to-br from-indigo-500 to-purple-500 text-white shadow-lg"
            : "bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600"
        )}
      >
        <Icon size={32} />
      </div>
      <div
        className={clsx(
          "font-semibold text-center transition-colors duration-200",
          selected ? "text-indigo-700" : "text-gray-700"
        )}
      >
        {label}
      </div>
      {selected && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white shadow-sm" />
      )}
    </div>
  );
};

export default CategoryInput;
