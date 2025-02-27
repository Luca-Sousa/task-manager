import { z } from "zod";
import { TasksCategory, TasksStatus } from "@prisma/client";
import { tasksTimeIguais } from "@/app/_data-access/tasks/tasks-time-iguais";

export const createTasksSchema = z
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
        message: "A data de término não pode ser no passado.",
      }),
  })
  .refine(
    (data) => data.startTime.toDateString() === data.endTime.toDateString(),
    {
      message: "A data de término deve ser no mesmo dia da data de início.",
      path: ["endTime"],
    },
  )
  .refine((data) => data.endTime > data.startTime, {
    message: "A data de término deve ser posterior à data de início.",
    path: ["endTime"],
  })
  .refine(
    async (data) => {
      const tasks = await tasksTimeIguais({
        startTime: data.startTime,
        endTime: data.endTime,
      });

      // Verifica se há tarefas que se sobrepõem
      return tasks.length === 0; // Retorna `true` se não houver sobreposição
    },
    {
      message: "Já existe uma tarefa no mesmo intervalo de tempo.",
      path: ["startTime"],
    },
  );

export type CreateTasksSchema = z.infer<typeof createTasksSchema>;
