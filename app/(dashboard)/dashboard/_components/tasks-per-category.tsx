import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TASK_CATEGORY_LABELS } from "@/app/_constants/data_tasks";
import { TotalTasksPerCategory } from "@/app/_data-access/get-dashboard/types";
import Image from "next/image";

interface TasksPerCategoryProps {
  tasksPerCategory: TotalTasksPerCategory[];
}

const TasksPerCategory = ({ tasksPerCategory }: TasksPerCategoryProps) => {
  return (
    <Card className="flex h-full flex-col bg-muted/20 hover:bg-muted/30 2xl:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">
          Quantidade de Tarefas por Categoria
        </CardTitle>
      </CardHeader>

      {tasksPerCategory.length > 0 ? (
        <ScrollArea className="h-full">
          <CardContent className="space-y-6">
            {tasksPerCategory.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex w-full justify-between">
                  <p className="text-sm font-bold">
                    {TASK_CATEGORY_LABELS[category.category]}
                  </p>
                  <p className="text-sm font-bold">
                    {category.porcentageOfTotalTasks}%
                  </p>
                </div>

                <Progress value={category.porcentageOfTotalTasks} />
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      ) : (
        <div className="flex h-full flex-col items-center justify-between gap-5 pt-5">
          <p className="max-w-xs text-center text-base font-semibold text-muted-foreground sm:text-lg xl:max-w-sm">
            Sem porcentagem de quantidade de tarefas por categoria, crie novas
            tarefas
            <br />
            <span className="text-xl font-bold text-primary">HOJE MESMO!</span>
          </p>

          <div className="relative aspect-video w-full max-w-lg">
            <Image
              src="/undraw_empty.svg"
              alt="Imagem referente a de quantidade de tarefas por categoria"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </Card>
  );
};

export default TasksPerCategory;
