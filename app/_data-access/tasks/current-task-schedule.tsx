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

  // Criar a data no fuso local
  const localDate = new Date(Number(year), Number(month) - 1, Number(day));

  // Garantir que startOfDay e endOfDay usem a data local corretamente
  const start = startOfDay(localDate);
  const end = endOfDay(localDate);

  const tasks = await db.tasks.findMany({
    where: {
      startTime: {
        gte: start,
        lt: end,
      },
      userId: userId,
    },
    orderBy: { startTime: "asc" },
  });

  console.log(tasks);
  return tasks;
};
