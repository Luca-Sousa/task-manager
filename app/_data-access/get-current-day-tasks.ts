"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DatetimeConversion } from "../_constants/datetime-conversion";

export const getCurrentDayTasks = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString();
  const day = new Date().getDate().toString();

  return await db.tasks.count({
    where: {
      userId,
      createdAt: {
        gte: DatetimeConversion({ year, month, day }).startOfDay,
        lte: DatetimeConversion({ year, month, day }).endOfDay,
      },
    },
  });
};
