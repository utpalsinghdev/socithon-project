import React from "react";
import Atom from "./_components/Atom";
import { prisma } from "@/lib/db";
import { $Enums, ROLE, STATUS } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
interface NewTask {
  name: string;
  location: string;
  image: string;
}
const page = async () => {
  const user = await getServerSession(authOptions);
  if (user?.user) {
    if (user.user.role !== ROLE.ADMIN) {
      redirect("/");
    }
  }
  const _tasks = await prisma.task.findMany({});
  async function addTask(data: NewTask) {
    "use server";
    try {
      const _newTask = await prisma.task.create({
        data: {
          name: data.name,
          location: data.location,
          image: data.image,
        },
      });
      revalidatePath("/add-task");
      return _newTask;
    } catch (error) {
      return error;
    }
  }
  async function markComplete(id: string) {
    "use server";
    try {
      // const data = JSON.parse(_data);
      const _newTask = await prisma.task.update({
        where: { id },
        data: {
          status: STATUS.COMPLETED,
        },
      });
      revalidatePath("/add-task");
      return _newTask;
    } catch (error) {
      return error;
    }
  }
  console.log(_tasks);
  return <Atom data={_tasks} addTask={addTask} markComplete={markComplete} />;
};

export default page;
