"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";

interface UpdateTaskStartTimeProps {
  taskId: string;
  startTime: Date;
}

export const updateTaskStartTime = async ({
  taskId,
  startTime,
}: UpdateTaskStartTimeProps) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Você não está logado.");

  if (!taskId && !startTime) {
    throw new Error("ID e a date de início são obrigatórios.");
  }

  await db.tasks.update({
    where: { id: taskId },
    data: { startTime },
  });

  revalidatePath("/tasks");
};
