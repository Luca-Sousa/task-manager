-- CreateEnum
CREATE TYPE "NotificationsStatus" AS ENUM ('UNREAD', 'READ', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Notifications" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "status" "NotificationsStatus" NOT NULL DEFAULT 'UNREAD',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_taskId_key" ON "Notifications"("taskId");

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
