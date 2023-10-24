"use client";
import React from "react";
import { toast } from "sonner";

interface Props {}

const Submit = (props: any) => {
  return (
    <button
      onClick={async () => {
        await props.onClick();
        toast.success("Your Task is under review");
      }}
      type="submit"
      className="px-3 w-full mt-2 py-2 bg-blue-800 rounded-lg text-white hover:bg-blue-900"
    >
      Submit
    </button>
  );
};

export default Submit;
