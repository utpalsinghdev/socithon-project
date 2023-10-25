"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import { LuLogOut } from "react-icons/lu";

interface Props {}

const Logout = () => {
  return (
    <LuLogOut
      onClick={async () => {
        await signOut();
        redirect("/login");
      }}
      className="text-xl cursor-pointer"
    />
  );
};

export default Logout;
