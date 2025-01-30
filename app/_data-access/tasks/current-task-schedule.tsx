"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../_lib/prisma";
import { DatetimeConversion } from "@/app/_constants/datetime-conversion";

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

  const startOfDay = DatetimeConversion({ year, month, day }).startOfDay;
  const endOfDay = DatetimeConversion({ year, month, day }).endOfDay;

  const tasks = await db.tasks.findMany({
    where: {
      startTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
      userId: userId,
    },
    orderBy: { startTime: "asc" },
  });

  return tasks;
};
