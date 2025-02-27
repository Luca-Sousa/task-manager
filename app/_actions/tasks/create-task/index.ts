"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { TasksCategory, TasksStatus } from "@prisma/client";
import { createTasksSchema } from "./schema";

interface createTasksProps {
  id?: string;
  name: string;
  description: string;
  status: TasksStatus;
  category: TasksCategory;
  startTime: Date;
  endTime: Date;
}

export const createTasks = async (data: createTasksProps) => {
  await createTasksSchema.parseAsync(data);

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.tasks.create({
    data: { ...data, userId },
  });

  revalidatePath("/tasks");
};
