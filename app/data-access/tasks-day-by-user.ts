"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../_lib/prisma";

export const tasksDayByUser = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  return await db.tasks.findMany({
    where: {
      startTime: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      userId: userId,
    },
    orderBy: { startTime: "asc" },
  })
};
