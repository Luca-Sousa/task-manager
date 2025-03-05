"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getUserNotifications = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const notifications = await db.notifications.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        taskId: true,
        status: true,
        userId: true,
        createdAt: true,
        task: {
          select: {
            name: true,
            startTime: true,
          },
        },
      },
    });

    // Mapeia os dados para o formato esperado pelo componente
    const formattedNotifications = notifications.map((notification) => ({
      id: notification.id,
      status: notification.status,
      taskName: notification.task.name,
      taskStartTime: notification.task.startTime,
    }));

    return formattedNotifications;
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    throw error; // Relança o erro para ser tratado no componente
  }
};
