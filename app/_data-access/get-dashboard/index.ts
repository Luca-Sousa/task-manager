"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TotalTasksPerCategory } from "./types";
import { endOfDay, startOfDay } from "date-fns";

interface getDashboardParams {
  day?: string;
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

  // Ajuste no início e fim do filtro de datas
  const start = day
    ? startOfDay(new Date(Number(year), Number(month) - 1, Number(day)))
    : month
      ? startOfDay(new Date(Number(year), Number(month) - 1, 1)) // Início do mês
      : startOfDay(new Date(Number(year), 0, 1)); // Início do ano, se não houver mês nem dia

  const end = day
    ? endOfDay(new Date(Number(year), Number(month) - 1, Number(day)))
    : month
      ? endOfDay(new Date(Number(year), Number(month), 0)) // Último dia do mês
      : endOfDay(new Date(Number(year), 11, 31)); // Último dia do ano, se não houver mês nem dia

  const where = {
    startTime: {
      gte: start,
      lte: end,
    },
  };

  const notStartedTotal = await db.tasks.count({
    where: { userId, ...where, status: "NOT_STARTED" },
  });

  const inProgressTotal = await db.tasks.count({
    where: { userId, ...where, status: "IN_PROGRESS" },
  });

  const completedTotal = await db.tasks.count({
    where: { userId, ...where, status: "COMPLETED" },
  });

  const unrealizedTotal = await db.tasks.count({
    where: { userId, ...where, status: "UNREALIZED" },
  });

  const tasksTotal = await db.tasks.count({
    where: { userId, ...where },
  });

  const percentageOfTasksCompleted = tasksTotal
    ? Math.round((completedTotal / tasksTotal) * 100)
    : 0;

  const TotalTasksPerCategory: TotalTasksPerCategory[] = (
    await db.tasks.groupBy({
      by: ["category"],
      where: { userId, ...where },
      _count: true,
    })
  ).map((category) => ({
    category: category.category,
    TotalAmount: category._count,
    porcentageOfTotalTasks:
      tasksTotal > 0 ? Math.round((category._count / tasksTotal) * 100) : 0,
  }));

  const lastTasks = await db.tasks.findMany({
    where: { userId },
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
