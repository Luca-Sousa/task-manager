"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../../_lib/prisma";
import { DateTime } from "luxon";

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

  const timeZone = "America/Sao_Paulo"; // Defina o fuso horário

  // Criar o início e o fim do dia no fuso horário local
  const startOfDay = DateTime.fromObject(
    {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: 0,
      minute: 0,
      second: 0,
    },
    { zone: timeZone },
  )
    .toUTC()
    .toISO();

  const endOfDay = DateTime.fromObject(
    {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: 23,
      minute: 59,
      second: 59,
    },
    { zone: timeZone },
  )
    .toUTC()
    .toISO();

  if (!startOfDay || !endOfDay) {
    throw new Error("Invalid date range");
  }

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
