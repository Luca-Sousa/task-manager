"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { TasksCategory, TasksStatus } from "@prisma/client";
import { createTasksSchema } from "./schema";
import { createNotification } from "../../notifications/create-notification";

interface createTasksProps {
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

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  const task = await db.tasks.create({
    data: { ...data, userId },
  });

  if (hasPremiumPlan) {
    await createNotification(task.id);
  }

  revalidatePath("/tasks");
};
