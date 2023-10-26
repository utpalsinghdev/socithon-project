"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
const page = () => {
  return (
    //starts
    <div className="w-full flex items-center flex-col gap-16 justify-center h-screen">
      <Image
        alt="login-img"
        src="/login.png"
        width={150}
        className="w-64 h-auto rounded-lg"
        height={150}
      />
      <button
        onClick={() => signIn("google")}
        className="px-3 py-3 mx-4 bg-blue-800 rounded-lg text-white hover:bg-blue-900"
      >
        Continue with Google
      </button>
    </div>
  ); //end
};

export default page;
