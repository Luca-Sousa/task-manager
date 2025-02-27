"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateTaskNameProps {
  taskId: string;
  name: string;
}

export const updateTaskName = async ({ taskId, name }: UpdateTaskNameProps) => {
  await db.tasks.update({
    where: { id: taskId },
    data: { name },
  });

  revalidatePath("/tasks");
};
