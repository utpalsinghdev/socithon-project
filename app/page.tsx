import { prisma } from "@/lib/db";
import TaskCard from "./_component/TaskCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "sonner";
export default async function Home() {
  const user = await getServerSession(authOptions);
  const tasks = await prisma.task.findMany({
    where: {
      status: {
        equals: "PENDING",
      },
    },
    include: {
      users: true,
    },
  });
  async function joinTask(id: string) {
    "use server";
    try {
      if (user?.user?.email) {
        const _joinTask = await prisma.task.update({
          where: { id: id },
          data: {
            users: {
              connect: {
                id: user.user.id,
              },
            },
          },
        });
        revalidatePath("/");
        return _joinTask;
      }
    } catch (error) {
      return "error";
    }
  }
  return (
    <main className="flex font-mono max-w-screen-xl px-4 py-8 items-center flex-col">
      <h2 className="text-xl font-semibold w-full mt-8">Hello, Eco-warrior</h2>
      <div className="w-full mt-4 flex flex-col gap-y-2">
        <div className="w-full flex gap-4">
          <span className="w-[55%]  flex border border-blue-400 items-center justify-center bg-indigo-100 rounded-sm  text-blue-900">
            7 UpComing Tasks
          </span>
          <span className="w-[45%] py-8 flex items-center border border-blue-400 justify-center bg-indigo-100 rounded-sm text-blue-900">
            16 Pending Tasks
          </span>
        </div>

        <div className="w-full flex gap-4">
          <span className="w-[40%] border border-blue-400 py-8 flex items-center justify-center bg-indigo-100 rounded-sm text-blue-900">
            3 New Tasks
          </span>
          <span className="w-[60%] border border-blue-400 flex items-center justify-center bg-indigo-100 rounded-sm text-blue-900">
            1 New Message
          </span>
        </div>
        <h2 className="text-md font-semibold mt-4 w-full">
          Today&rsquo;s Tasks
        </h2>
        <div className="w-full flex-col">
          {tasks.map((task, key) => (
            <TaskCard
              key={key}
              {...task}
              userId={user?.user.id}
              joinTask={joinTask}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
