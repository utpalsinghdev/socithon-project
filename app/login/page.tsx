"use client";
import React from "react";
import { signIn } from "next-auth/react";
const page = () => {
  return (
    //starts
    <div className="w-full flex items-center justify-center h-screen">
      <button
        onClick={() => signIn("google")}
        className="px-3 py-3 bg-blue-800 rounded-lg text-white hover:bg-blue-900"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default page;
