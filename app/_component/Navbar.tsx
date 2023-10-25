import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import Logout from "./Logout";
import Link from "next/link";
import { ROLE, STATUS } from "@prisma/client";
import { FaRegCalendarPlus } from "react-icons/fa6";
const Navbar = async () => {
  const user = await getServerSession(authOptions);
  return (
    <>
      {user?.user ? (
        <div className="fixed bg-white w-full px-4 py-2 shadow-md flex items-center justify-between">
          <span className="flex items-center justify-start gap-2">
            {" "}
            <Image
              src={
                user?.user.image
                  ? user?.user.image
                  : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              alt="profile"
              width={1920}
              height={1080}
              className="w-8 rounded-full"
            />
            <Link href={"/"}>{user?.user.name}</Link>
            {user?.user.role === ROLE.ADMIN && (
              <Link
                className="text-sm px-2 py-0.5 disabled:text-white disabled:cursor-not-allowed bg-indigo-200 text-blue-900 rounded-md"
                href={"/add-task"}
              >
                Add Task
              </Link>
            )}
          </span>
          <span className="flex items-center justify-between gap-4">
            <AiOutlineBell className="text-xl cursor-pointer" />
            <Logout />
          </span>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
