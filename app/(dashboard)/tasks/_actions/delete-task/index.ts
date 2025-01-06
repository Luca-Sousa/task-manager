import { db } from "@/app/_lib/prisma";
import { deleteTasksSchema, DeleteTasksSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTasks = async ({ taskId }: DeleteTasksSchema) => {
  deleteTasksSchema.parse(taskId);

  await db.tasks.delete({
    where: {
      id: taskId,
    },
  });

  revalidatePath("/tasks");
};
