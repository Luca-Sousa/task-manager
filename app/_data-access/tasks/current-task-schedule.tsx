"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../_lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

interface currentTasksScheduleProps {
  year: string;
  month: string;
  day: string;
}

export const currentTasksSchedule = async ({
  year,
  month,
  day,
}: currentTasksScheduleProps) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const tasks = await db.tasks.findMany({
    where: {
      startTime: {
        gte: startOfDay(`${year}-${month}-${day}`),
        lt: endOfDay(`${year}-${month}-${day}`),
      },
      userId: userId,
    },
    orderBy: { startTime: "asc" },
  });

  return tasks;
};
