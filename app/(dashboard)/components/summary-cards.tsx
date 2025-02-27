import { Card } from "@/app/_components/ui/card";
import { TASK_STATUS_OPTIONS } from "@/app/_constants/data_tasks";
import {
  PackageIcon,
  LayoutListIcon,
  ListChecksIcon,
  BookXIcon,
} from "lucide-react";
import CreateTaskButton from "../tasks/_components/create-button-task";
import { canUserAddtask } from "@/app/_data-access/can-user-add-task";

interface SummaryCardsProps {
  notStartedTotal: number;
  completedTotal: number;
  unrealizedTotal: number;
  tasksTotal: number;
}

const SummaryCards = async ({
  notStartedTotal,
  completedTotal,
  unrealizedTotal,
  tasksTotal,
}: SummaryCardsProps) => {
  const userCanAddtasks = await canUserAddtask();

  return (
    <div className="space-y-3">
      <Card className="flex justify-between rounded-xl bg-muted/20 p-4 hover:bg-muted/30">
        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full items-center justify-start gap-3">
            <div className="w-fit rounded-sm bg-primary/50 p-1.5">
              <PackageIcon />
            </div>

            <span className="text-xl font-bold text-foreground">
              Total de Tarefas
            </span>
          </div>

          <div className="flex items-end justify-between text-sm text-muted-foreground">
            <div className="flex gap-1.5">
              <span className={`${tasksTotal === 0 && "hidden"}`}>
                {tasksTotal}
              </span>

              <span>
                {tasksTotal > 1
                  ? "Tarefas"
                  : tasksTotal === 0
                    ? "Nenhuma Tarefa"
                    : "Tarefa"}
              </span>
            </div>

            <CreateTaskButton userCanAddtasks={userCanAddtasks} />
          </div>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {TASK_STATUS_OPTIONS.map((status) => (
          <Card
            className={`${
              status.value === "IN_PROGRESS" && "hidden"
            } rounded-xl bg-muted/20 p-4 hover:bg-muted/30`}
            key={status.label}
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-row-reverse items-center justify-between">
                <div className="w-fit rounded-sm bg-primary/50 p-1.5">
                  {status.value === "NOT_STARTED" && <LayoutListIcon />}
                  {status.value === "COMPLETED" && <ListChecksIcon />}
                  {status.value === "UNREALIZED" && <BookXIcon />}
                </div>

                <span className="text-xl font-bold text-foreground">
                  {status.label}
                </span>
              </div>

              <div className="flex gap-1.5 text-sm text-muted-foreground">
                <span>
                  {status.value === "NOT_STARTED" &&
                    notStartedTotal > 0 &&
                    notStartedTotal}
                  {status.value === "COMPLETED" &&
                    completedTotal > 0 &&
                    completedTotal}
                  {status.value === "UNREALIZED" &&
                    unrealizedTotal > 0 &&
                    unrealizedTotal}
                </span>

                <span>
                  {status.value === "NOT_STARTED" &&
                    (notStartedTotal > 1
                      ? "Tarefas"
                      : notStartedTotal === 0
                        ? "Nenhuma Tarefa"
                        : "Tarefa")}
                  {status.value === "COMPLETED" &&
                    (completedTotal > 1
                      ? "Tarefas"
                      : completedTotal === 0
                        ? "Nenhuma Tarefa"
                        : "Tarefa")}
                  {status.value === "UNREALIZED" &&
                    (unrealizedTotal > 1
                      ? "Tarefas"
                      : unrealizedTotal === 0
                        ? "Nenhuma Tarefa"
                        : "Tarefa")}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
