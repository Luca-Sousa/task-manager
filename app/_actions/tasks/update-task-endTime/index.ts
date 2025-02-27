"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";

interface UpdateTaskEndTimeProps {
  taskId: string;
  endTime: Date;
}

export const updateTaskEndTime = async ({
  taskId,
  endTime,
}: UpdateTaskEndTimeProps) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Você não está logado.");

  if (!taskId && !endTime) {
    throw new Error("ID e a date de término são obrigatórios.");
  }

  await db.tasks.update({
    where: { id: taskId },
    data: { endTime },
  });

  revalidatePath("/tasks");
};
