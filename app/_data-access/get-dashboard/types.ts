import { TasksCategory } from "@prisma/client";

export interface TotalTasksPerCategory {
  category: TasksCategory;
  TotalAmount: number;
  porcentageOfTotalTasks: number;
}
