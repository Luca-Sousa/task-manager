import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TASK_CATEGORY_LABELS } from "@/app/_constants/data_tasks";
import { TotalTasksPerCategory } from "@/app/_data-access/get-dashboard/types";

interface TasksPerCategoryProps {
  tasksPerCategory: TotalTasksPerCategory[];
}

const TasksPerCategory = ({ tasksPerCategory }: TasksPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full pb-6">
      <CardHeader>
        <CardTitle className="text-lg">
          Quantidade de Tarefas por Categoria
        </CardTitle>
      </CardHeader>

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
  );
};

export default TasksPerCategory;
