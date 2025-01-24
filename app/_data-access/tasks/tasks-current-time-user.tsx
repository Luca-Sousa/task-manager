"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../_lib/prisma";

interface tasksCurrentTimeUserProps {
  year: string;
  month: string;
  day: string;
}

export const tasksCurrentTimeUser = async ({
  year,
  month,
  day,
}: tasksCurrentTimeUserProps) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const tasks = await db.tasks.findMany({
    where: {
      startTime: {
        gte: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00`,
        lte: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T23:59:59`,
      },
      userId: userId,
    },
    orderBy: { startTime: "asc" },
  });

  return tasks;
};
