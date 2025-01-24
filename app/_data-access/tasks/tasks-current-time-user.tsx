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

  const startOfDay = new Date(
    `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00`,
  );
  const endOfDay = new Date(
    `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T23:59:59`,
  );

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
