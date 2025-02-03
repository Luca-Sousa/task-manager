import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Separator } from "@/app/_components/ui/separator";
import { TASK_CATEGORY_LABELS } from "@/app/_constants/data_tasks";
import { Tasks } from "@prisma/client";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ClockIcon, FileIcon } from "lucide-react";
import Link from "next/link";

interface LastTasksProps {
  lastTasks: Tasks[];
}

const LastTasks = ({ lastTasks }: LastTasksProps) => {
  return (
    <ScrollArea className="w-full">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg">Últimas Tarefas Cadastradas</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/tasks">Ver mais</Link>
        </Button>
      </CardHeader>

      <Separator className="mb-6" />

      <CardContent className="space-y-6">
        {lastTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileIcon />
              <p>
                {task.name}
                <span className="flex text-xs text-muted-foreground">
                  {TASK_CATEGORY_LABELS[task.category]}
                </span>
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-sm">
                {format(task.startTime, "PPP", {
                  locale: ptBR,
                })}
              </div>

              <div className="flex items-center justify-end gap-1.5 text-xs">
                <ClockIcon size={12} />
                {format(
                  task.startTime instanceof Date
                    ? task.startTime
                    : parseISO(task.startTime),
                  "HH:mm", // Apenas o horário
                  { locale: ptBR },
                )}
                &nbsp;-&nbsp;
                {format(
                  task.endTime instanceof Date
                    ? task.endTime
                    : parseISO(task.endTime),
                  "HH:mm", // Apenas o horário
                  { locale: ptBR },
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTasks;
