"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { LuLogOut } from "react-icons/lu";

interface Props {}

const Logout = () => {
  return (
    <LuLogOut
      onClick={() => {
        signOut();
      }}
      className="text-xl cursor-pointer"
    />
  );
};

export default Logout;
