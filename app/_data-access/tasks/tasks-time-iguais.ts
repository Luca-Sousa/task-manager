"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../_lib/prisma";

interface TaskTimeProps {
  startTime: Date;
  endTime: Date;
}

export const tasksTimeIguais = async ({
  startTime,
  endTime,
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
    },
  });

  return tasks;
};
