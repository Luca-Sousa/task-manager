import { z } from "zod";

export const deleteTasksSchema = z.object({
  taskId: z.string().uuid(),
});

export type DeleteTasksSchema = z.infer<typeof deleteTasksSchema>;
