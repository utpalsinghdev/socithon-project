import classNames from "@/lib/classname";
import React from "react";

const defaultProps = {
  variant: "primary",
  size: "FULL",
  type: "button",
  loading: false,
  disabled: false,
  loadingText: "testing...",
};

function Button({
  className,
  loading,
  loadingText,
  variant,
  size,
  type,
  children,
  disabled,
  onClick,
  ...props
}: {
  className?: string | undefined;
  loading?: boolean;
  loadingText?: string;
  variant?: string;
  size?: "FULL" | "NORMAL" | "x";
  type?: "button" | "submit" | "reset";
  children?: JSX.Element | string;
  disabled?: boolean;
  onClick?: (event: any) => void;
}) {
  const onClickHandler = (event: any) => {
    if (disabled || loading) return;
    onClick && onClick(event);
  };

  return (
    <button
      onClick={onClickHandler}
      className={classNames(
        "inline-flex justify-center rounded-md border border-transparent disabled:cursor-not-allowed disabled:opacity-80 ",
        variant === "primary" ? "bg-indigo-800" : "bg-gray-300",
        size === "FULL"
          ? "px-4 py-4 w-full"
          : size === "NORMAL"
          ? "px-4 py-2"
          : "px-2 py-1",
        "text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm",
        className ? className : ""
      )}
      disabled={disabled}
      type={type}
      aria-label={type}
      {...props}
    >
      {!loading && children}
      {loading && (
        <span className="flex items-center justify-center">
          <span className="flex items-center justify-center">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></span>
          </span>
          <span className="ltr:ml-1 rtl:mr-1 text-sm">{loadingText}</span>
        </span>
      )}
    </button>
  );
}

Button.defaultProps = defaultProps;

export default Button;
