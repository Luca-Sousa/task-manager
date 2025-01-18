"use server";

import { TasksStatus } from "@prisma/client";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";

interface UpdateTaskStatusParams {
  id: string;
  status: TasksStatus;
}

export const updateTaskStatus = async ({
  id,
  status,
}: UpdateTaskStatusParams) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Você não está logado.");

  if (!id && !status) {
    throw new Error("ID e status são obrigatórios.");
  }

  await db.tasks.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/tasks");
};
