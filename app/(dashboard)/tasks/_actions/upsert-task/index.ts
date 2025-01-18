"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { TasksCategory, TasksStatus } from "@prisma/client";
import { upsertTasksSchema } from "./schema";

interface upsertTasksProps {
  id?: string;
  name: string;
  description: string;
  status: TasksStatus;
  category: TasksCategory;
  startTime: Date;
  endTime: Date;
}

export const upsertTasks = async (data: upsertTasksProps) => {
  upsertTasksSchema.parse(data);

  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.tasks.upsert({
    update: { ...data, userId },
    create: { ...data, userId },
    where: {
      id: data?.id ?? "",
    },
  });

  revalidatePath("/tasks");
};
