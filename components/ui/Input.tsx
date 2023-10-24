import classNames from "@/lib/classname";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import React, { ChangeEvent } from "react";

interface InputProps {
  className?: string;
  name?: string;
  id?: string;
  label?: string;
  required?: boolean;
  placeholder: string;
  error?: string;
  loading?: boolean;
  loadingText?: string;
  variant?: string;
  type?: string;
  children?: JSX.Element;
  icon?: JSX.Element;
  disabled?: boolean;
  onChange?: any; // Add onChange prop
}

function Input({
  className,
  type,
  name,
  error,
  placeholder,
  id,
  label,
  required,
  onChange, // Include onChange here
  ...rest
}: InputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-1.5 rounded-md shadow-sm">
        <input
          id={id || name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={classNames(
            "block w-full rounded-md text-black border-0 py-2 ring-1 ring-gray-300 ring-inset",
            error
              ? "ring-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500"
              : "ring-indigo-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500",
            type === "file" ? "py-1.5 pl-2.5 bg-white text-gray-500" : "",
            className || ""
          )}
          onChange={onChange} // Pass onChange handler here
          {...rest}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600" id="error">
          {error}
        </p>
      )}
    </div>
  );
}

Input.defaultProps = {
  id: "name",
  label: "Email",
  placeholder: "Enter Your Email Address",
  type: "text",
  name: "name",
  error: null,
  required: false,
  icon: (
    <ExclamationCircleIcon
      className="h-5 w-5 text-indigo-500"
      aria-hidden="true"
    />
  ),
};

export default Input;
