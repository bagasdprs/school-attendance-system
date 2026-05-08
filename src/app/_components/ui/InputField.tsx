import React from "react";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export const InputField = ({
  label,
  registration,
  error,
  ...props
}: InputFieldProps) => {
  return (
    <div className="mb-4 flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...registration}
        {...props}
        className={`w-full rounded-lg border px-4 py-3 text-sm transition-colors outline-none ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            : "border-gray-300 focus:border-[#8CC63F] focus:ring-1 focus:ring-[#8CC63F]"
        }`}
      />
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  );
};
