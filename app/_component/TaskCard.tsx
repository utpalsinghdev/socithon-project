"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const TaskCard = (props: any) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/submission/${props.id}`);
  };
  return (
    <div
      onClick={() => {
        if (
          props.users.some((user: User) => user.id === props.userId)
            ? true
            : false
        ) {
          handleCardClick();
        }
      }}
      className="cursor-pointer border border-blue-900/10 px-1 py-2 rounded-lg flex flex-row items-center justify-between"
    >
      <div className="flex flex-col items-start justify-between">
        {" "}
        <div>{props.name}</div>
        <div>{props.location}</div>
        <button
          disabled={props.users.some((user: User) => user.id === props.userId)}
          onClick={async () => {
            await props.joinTask(props.id);
            toast.success("Task Joined !");
          }}
          className="text-sm px-2 py-0.5 disabled:text-white disabled:cursor-not-allowed bg-indigo-200 text-blue-900 rounded-md"
        >
          {props.users.some((user: User) => user.id === props.userId)
            ? "Already In"
            : "Join Task"}
        </button>
      </div>
      <Image
        src={
          props.image
            ? props.image
            : "https://res.cloudinary.com/dedbpyhmr/image/upload/v1698165237/dirty-streets_be8n7t.jpg"
        }
        alt="task-img"
        width={1920}
        height={1080}
        className="w-28"
      />
    </div>
  );
};

export default TaskCard;
