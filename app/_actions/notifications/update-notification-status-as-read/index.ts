"use server";

import { db } from "@/app/_lib/prisma";
import { NotificationsStatus } from "@prisma/client";

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    await db.notifications.update({
      where: { id: notificationId },
      data: { status: NotificationsStatus.READ },
    });
  } catch (error) {
    console.error("Erro ao marcar notificação como lida:", error);
  }
};
