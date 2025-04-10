"use server";

import { TasksStatus } from "@prisma/client";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";

interface UpdateTaskStatusProps {
  taskId: string;
  status: TasksStatus;
}

export const updateTaskStatus = async ({
  taskId,
  status,
}: UpdateTaskStatusProps) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Você não está logado.");

  if (!taskId && !status) {
    throw new Error("ID e status são obrigatórios.");
  }

  await db.tasks.update({
    where: { id: taskId },
    data: { status },
  });

  revalidatePath("/tasks");
};
