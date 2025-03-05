import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Separator } from "@/app/_components/ui/separator";
import {
  TASK_CATEGORY_ICONS,
  TASK_CATEGORY_LABELS,
} from "@/app/_constants/data_tasks";
import { Tasks } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LastTasksProps {
  lastTasks: Tasks[];
}

const LastTasks = ({ lastTasks }: LastTasksProps) => {
  return (
    <Card className="flex h-full w-full flex-col overflow-hidden bg-muted/20 hover:bg-muted/30">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg">Últimas Tarefas Cadastradas</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/tasks">Ver mais</Link>
        </Button>
      </CardHeader>

      <Separator className="mb-6" />

      {lastTasks.length > 0 ? (
        <ScrollArea>
          <CardContent className="space-y-6">
            {lastTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/[5%] p-3">
                    <Image
                      priority
                      src={TASK_CATEGORY_ICONS[task.category]}
                      alt="PIX"
                      width={24}
                      height={24}
                    />
                  </div>

                  <div>
                    <h4 className="max-w-40 truncate">{task.name}</h4>
                    <p className="flex text-xs text-muted-foreground">
                      {TASK_CATEGORY_LABELS[task.category]}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-sm/relaxed">
                    {format(task.startTime, "PPP", {
                      locale: ptBR,
                    })}
                  </div>

                  <div className="flex items-center justify-end gap-1.5 text-xs/relaxed">
                    <ClockIcon size={12} />
                    {format(task.startTime.getTime(), "HH:mm", {
                      locale: ptBR,
                    })}
                    {" - "}
                    {format(task.endTime.getTime(), "HH:mm", {
                      locale: ptBR,
                    })}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-5 px-20 pb-6 sm:px-40 md:px-32 lg:px-48 xl:px-96 2xl:px-20">
          <p className="text-center text-lg font-semibold md:text-xl">
            Sem dados das últimas tarefas cadastradas, com crie novas tarefas
            <br />
            <span className="texy-xl font-bold text-primary md:text-2xl">
              HOJE MESMO!
            </span>
          </p>

          <div className="relative aspect-square w-full">
            <Image
              src="/undraw_no-data_ig65.svg"
              alt="Imagem referente as últimas tarefas cadastradas"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default LastTasks;
