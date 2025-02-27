"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateDescriptionTaskProps {
  taskId: string;
  description: string;
}

export const updateDescriptionTask = async ({
  taskId,
  description,
}: UpdateDescriptionTaskProps) => {
  await db.tasks.update({
    where: { id: taskId },
    data: { description },
  });

  revalidatePath("/tasks");
};
