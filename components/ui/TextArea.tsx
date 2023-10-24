import classNames from "@/lib/classname";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

import React from "react";
function TextArea({
  className,
  icon,
  name,
  error,
  placeholder,
  id,
  row,
  label,
  required,
  ...rest
}: {
  className: string;
  name: string;
  id: string;
  label: string;
  required: boolean;
  placeholder: string;
  error: string;
  loading: boolean;
  loadingText: string;
  variant: string;
  row: number;
  children: JSX.Element;
  icon: JSX.Element;
  disabled: boolean;
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute top-[10px]  left-0 flex items-center justify-center px-1 pl-2">
          {icon}
        </div>
        <textarea
          id={id}
          name={name}
          rows={row}
          required={required}
          placeholder={placeholder}
          className={classNames(
            " block w-full rounded-md border-0 py-2 pl-8  ring-1 ring-gray-300 ring-inset  ",
            error
              ? "ring-red-300  focus:ring-2 focus:ring-inset focus:ring-red-500"
              : "ring-indigo-300  focus:ring-2 focus:ring-inset border  focus:border-indigo-500",
            className
          )}
          {...rest}
        />
      </div>
      {error && (
        <p className=" text-sm text-red-600" id="error">
          {error}
        </p>
      )}
    </div>
  );
}
TextArea.defaultProps = {
  id: "name",
  label: "Email",
  placeholder: "Enter Your Email Address",
  type: "text",
  name: "name",
  error: null,
  row: 3,
  required: false,
  icon: (
    <ExclamationCircleIcon
      className="h-5 w-5 text-indigo-500"
      aria-hidden="true"
    />
  ),
};

export default TextArea;
