import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfDay, startOfDay } from "date-fns";

export const getCurrentDayTasks = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay(new Date()),
        lt: endOfDay(new Date()),
      },
    },
  });
};
