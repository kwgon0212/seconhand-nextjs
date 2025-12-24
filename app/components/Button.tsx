import clsx from "clsx";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className={clsx(
        "relative disabled:opacity-70 disabled:cursor-not-allowed",
        "rounded-xl font-semibold w-full cursor-pointer",
        "transition-all duration-200 transform",
        "hover:scale-[1.02] active:scale-[0.98]",
        "focus:outline-none focus:ring-4 focus:ring-offset-2",
        small ? "py-2.5 text-sm border" : "py-4 text-base border-2 shadow-lg",
        outline
          ? "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 hover:border-gray-400 hover:shadow-xl"
          : "bg-linear-to-r from-indigo-600 to-purple-600 border-transparent text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500 shadow-indigo-500/50",
        disabled && "opacity-70 cursor-not-allowed hover:scale-100",
        small ? "w-1/4" : "w-full"
      )}
    >
      {Icon && (
        <Icon
          className="absolute left-5 top-1/2 transform -translate-y-1/2"
          size={20}
        />
      )}
      <span className={clsx(Icon && "ml-8")}>{label}</span>
    </button>
  );
};

export default Button;
