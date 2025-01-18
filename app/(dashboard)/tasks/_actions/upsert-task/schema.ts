import { TasksCategory, TasksStatus } from "@prisma/client";
import { z } from "zod";

export const upsertTasksSchema = z
  .object({
    name: z.string().trim().min(1, "O nome é obrigatório!"),
    description: z.string().min(1, "A descrição é obrigatória!"),
    status: z.nativeEnum(TasksStatus, {
      required_error: "O status é obrigatório!",
    }),
    category: z.nativeEnum(TasksCategory, {
      required_error: "A categoria é obrigatória!",
    }),
    startTime: z
      .date({
        required_error: "A data de início é obrigatória!",
      })
      .refine((date) => date > new Date(), {
        message: "A data de início não pode ser no passado.",
      }),
    endTime: z
      .date({
        required_error: "A data de término é obrigatória!",
      })
      .refine((date) => date > new Date(), {
        message: "A data de início não pode ser no passado.",
      }),
    existingTasks: z
      .array(
        z.object({
          startTime: z.date(),
          endTime: z.date(),
        }),
      )
      .optional(),
  })
  .refine(
    (data) => data.startTime.toDateString() === data.endTime.toDateString(),
    {
      message: "A data de término deve ser no mesmo dia da data de início.",
      path: ["endTime"],
    },
  )
  .refine((data) => data.startTime >= new Date(), {
    message: "A data de início não pode estar no passado.",
    path: ["startTime"],
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "A data de término deve ser posterior à data de início.",
    path: ["endTime"],
  })
  .refine(
    (data) => {
      if (!data.existingTasks) return true;
      return !data.existingTasks.some(
        (task) =>
          (data.startTime >= task.startTime && data.startTime < task.endTime) ||
          (data.endTime > task.startTime && data.endTime <= task.endTime) ||
          (data.startTime <= task.startTime && data.endTime >= task.endTime),
      );
    },
    {
      message: "O horário selecionado conflita com outra tarefa existente.",
      path: ["startTime", "endTime"],
    },
  );

export type upsertTasksSchema = z.infer<typeof upsertTasksSchema>;
