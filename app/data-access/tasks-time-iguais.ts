"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../_lib/prisma";

interface TaskTimeProps {
  startTime: Date;
  endTime: Date;
}

export const tasksTimeIguais = async ({
  startTime,
  endTime,
}: TaskTimeProps) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Consulta para verificar se há tarefas que se sobrepõem com o intervalo da nova tarefa
  const tasks = await db.tasks.findMany({
    where: {
      userId: userId,
      // Verifica se a tarefa existente se sobrepõe ao intervalo da nova tarefa
      OR: [
        {
          startTime: { lt: endTime }, // A tarefa existente começa antes do término da nova tarefa
          endTime: { gt: startTime }, // E termina depois do início da nova tarefa
        },
      ],
    },
  });

  return tasks;
};
