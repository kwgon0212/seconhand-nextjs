import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
}

const Input = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
}: InputProps) => {
  return (
    <div className="relative w-full group">
      {formatPrice && (
        <span className="text-gray-600 absolute left-4 top-6 text-lg font-medium">
          $
        </span>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={clsx(
          "peer w-full px-4 pt-7 pb-3 font-light bg-white/80 backdrop-blur-sm",
          "border-2 rounded-xl outline-none transition-all duration-200",
          "disabled:opacity-70 disabled:cursor-not-allowed",
          "focus:bg-white focus:shadow-lg focus:shadow-indigo-500/20",
          formatPrice ? "pl-10" : "pl-4",
          errors[id]
            ? "border-red-400 focus:border-red-500 focus:shadow-red-500/20"
            : "border-gray-200 focus:border-indigo-500"
        )}
      />
      <label
        className={clsx(
          "absolute text-sm font-medium duration-200 transform -translate-y-3 top-6 z-10 origin-left",
          "peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0",
          "peer-focus:scale-90 peer-focus:-translate-y-5",
          "pointer-events-none",
          formatPrice ? "left-10" : "left-4",
          errors[id]
            ? "text-red-500"
            : "text-gray-500 peer-focus:text-indigo-600"
        )}
      >
        {label}
      </label>
      {errors[id] && (
        <p className="mt-2 text-sm text-red-500">
          {(errors[id]?.message as string) ||
            `${label}은(는) 필수 입력 항목입니다`}
        </p>
      )}
    </div>
  );
};

export default Input;
