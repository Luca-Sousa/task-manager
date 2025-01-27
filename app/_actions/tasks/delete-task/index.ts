"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteTasksSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTasks = async ({ taskId }: DeleteTasksSchema) => {
  await db.tasks.delete({
    where: {
      id: taskId,
    },
  });

  revalidatePath("/tasks");
};
