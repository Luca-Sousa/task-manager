"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { endOfDay, startOfDay } from "date-fns";

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

  const notStartedTotal = await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay(`${year}-${month}-${day}`),
        lt: endOfDay(`${year}-${month}-${day}`),
      },
      status: "NOT_STARTED",
    },
  });

  const inProgressTotal = await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay(`${year}-${month}-${day}`),
        lt: endOfDay(`${year}-${month}-${day}`),
      },
      status: "IN_PROGRESS",
    },
  });

  const completedTotal = await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay(`${year}-${month}-${day}`),
        lt: endOfDay(`${year}-${month}-${day}`),
      },
      status: "COMPLETED",
    },
  });

  const unrealizedTotal = await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay(`${year}-${month}-${day}`),
        lt: endOfDay(`${year}-${month}-${day}`),
      },
      status: "UNREALIZED",
    },
  });

  const tasksTotal = await db.tasks.count({
    where: {
      userId,
      startTime: {
        gte: startOfDay(`${year}-${month}-${day}`),
        lt: endOfDay(`${year}-${month}-${day}`),
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
