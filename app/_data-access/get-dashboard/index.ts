"use server";

import { DatetimeConversion } from "@/app/_constants/datetime-conversion";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface getDashboardParams {
  day: string;
  month: string;
  year: string;
}

export const getDashboard = async ({
  day,
  month,
  year,
}: getDashboardParams) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const startOfDay = DatetimeConversion({ year, month, day }).startOfDay;
  const endOfDay = DatetimeConversion({ year, month, day }).endOfDay;

  const notStartedTotal = await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay,
        lt: endOfDay,
      },
      status: "NOT_STARTED",
    },
  });

  const inProgressTotal = await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay,
        lt: endOfDay,
      },
      status: "IN_PROGRESS",
    },
  });

  const completedTotal = await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay,
        lt: endOfDay,
      },
      status: "COMPLETED",
    },
  });

  const unrealizedTotal = await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay,
        lt: endOfDay,
      },
      status: "UNREALIZED",
    },
  });

  const tasksTotal = await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  });

  return {
    notStartedTotal,
    inProgressTotal,
    completedTotal,
    unrealizedTotal,
    tasksTotal,
  };
};
