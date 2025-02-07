"use server";

import { DatetimeConversion } from "@/app/_constants/datetime-conversion";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TotalTasksPerCategory } from "./types";

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

  const percentageOfTasksCompleted = isNaN(completedTotal / tasksTotal)
    ? 0
    : Math.round((completedTotal / tasksTotal) * 100 * 100) / 100;

  const TotalTasksPerCategory: TotalTasksPerCategory[] = (
    await db.tasks.groupBy({
      by: ["category"],
      where: {
        userId,
        startTime: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      _count: true,
    })
  ).map((category) => ({
    category: category.category,
    TotalAmount: category._count,
    porcentageOfTotalTasks:
      tasksTotal > 0 ? Math.round((category._count / tasksTotal) * 100) : 0,
  }));

  const lastTasks = await db.tasks.findMany({
    where: {
      userId,
    },
    orderBy: { startTime: "desc" },
    take: 10,
  });

  return {
    notStartedTotal,
    inProgressTotal,
    completedTotal,
    unrealizedTotal,
    tasksTotal,
    percentageOfTasksCompleted,
    TotalTasksPerCategory,
    lastTasks,
  };
};
