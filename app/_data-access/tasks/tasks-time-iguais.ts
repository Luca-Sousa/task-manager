"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../_lib/prisma";

interface TaskTimeProps {
  startTime: Date;
  endTime: Date;
  taskId?: string;
}

export const tasksTimeIguais = async ({
  startTime,
  endTime,
  taskId,
}: TaskTimeProps) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const tasks = await db.tasks.findMany({
    where: {
      userId: userId,
      OR: [
        {
          startTime: { lt: endTime },
          endTime: { gt: startTime },
        },
      ],
      NOT: {
        id: taskId,
      },
    },
  });

  return tasks;
};
