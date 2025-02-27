"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { TasksCategory } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpdateTaskCategorProps {
  taskId: string;
  category: TasksCategory;
}

export const updateTaskCategory = async ({
  taskId,
  category,
}: UpdateTaskCategorProps) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Você não está logado.");

  if (!taskId && !category) {
    throw new Error("ID e categoria são obrigatórios.");
  }

  await db.tasks.update({
    where: { id: taskId },
    data: { category },
  });

  revalidatePath("/tasks");
};
