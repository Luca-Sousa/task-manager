/*
  Warnings:

  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TasksStatus" AS ENUM ('NOT_STARTED', 'UNREALIZED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TasksCategory" AS ENUM ('WORK', 'STUDY', 'HOME', 'HEALTH_AND_WELLNESS', 'FINANCIAL', 'LEISURE', 'RELATIONSHIPS', 'VOLUNTEERING', 'TRAVEL', 'PERSONAL_DEVELOPMENT', 'TECHNOLOGY', 'SHOPPING', 'ERRANDS', 'OTHER');

-- DropTable
DROP TABLE "tasks";

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TasksStatus" NOT NULL,
    "category" "TasksCategory" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
