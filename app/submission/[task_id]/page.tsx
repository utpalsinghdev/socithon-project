import { prisma } from "@/lib/db";
import { STATUS } from "@prisma/client";
import Image from "next/image";
import React from "react";
import Submit from "./_components/Submit";

const page = async (props: any) => {
  const { params } = props;
  console.log(params.task_id);
  const _task = await prisma.task.findUnique({ where: { id: params.task_id } });
  async function markDone() {
    "use server";
    const _task = await prisma.task.update({
      where: { id: params.task_id },
      data: { status: STATUS.UNDER_REVIEW },
    });
    return _task;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Details</h1>

      <div className="mb-4">
        <h2 className="text-xl font-bold">Task Information</h2>
        <div className="flex items-start flex-col mb-2">
          <Image
            src={
              _task?.image
                ? _task.image
                : "https://res.cloudinary.com/dedbpyhmr/image/upload/v1698165237/dirty-streets_be8n7t.jpg"
            }
            width={1920}
            height={1080}
            alt="Task"
            className="w-28 mr-2"
          />
          <p className="font-bold">{_task?.name}</p>
        </div>
        <p>
          <strong>Location:</strong> {_task?.location}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">Rewards</h2>
        <p>
          <strong>Cashback:</strong> $10
        </p>
        <p>
          <strong>Points:</strong> 100
        </p>
        <p>
          <strong>Coupons:</strong> 20% off
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">Submit Proof of Work</h2>
        <form>
          <input
            required
            type="file"
            placeholder="Enter proof of work"
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <Submit onClick={markDone} />
        </form>
      </div>
    </div>
  );
};

export default page;
