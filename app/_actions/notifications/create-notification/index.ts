"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NotificationsStatus } from "@prisma/client";

export const createNotification = async (taskId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const notification = await db.notifications.create({
      data: {
        userId,
        taskId,
        status: NotificationsStatus.UNREAD,
      },
    });

    return { message: "Notificação criada", notification };
  } catch (error) {
    console.error("Erro ao criar notificação:", error);
    throw new Error("Erro ao criar notificação");
  }
};
