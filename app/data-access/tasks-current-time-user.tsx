"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../_lib/prisma";

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
        gte: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00Z`,
        lte: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T23:59:59Z`,
      },
      userId: userId,
    },
    orderBy: { startTime: "asc" },
  });
  return tasks;
};
