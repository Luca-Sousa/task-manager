"use client";

import { Card } from "@/app/_components/ui/card";
import { Tasks, TasksStatus } from "@prisma/client";

import {
  SunIcon,
  SunMoonIcon,
  MoonIcon,
  ClockIcon,
  ExternalLinkIcon,
  PencilIcon,
} from "lucide-react";
import TasksTypeBadge from "./type-badge";
import { Separator } from "@/app/_components/ui/separator";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { useMemo } from "react";
import { updateTaskStatus } from "../_actions/update-task-status";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import DeleteTaskButton from "./delete-task-button";

interface DataItemsTasksProps {
  tasks: Tasks[];
}

const DataItemsTasks = ({ tasks }: DataItemsTasksProps) => {
  const statuses = Object.values(TasksStatus);

  const formatTime = (date: Date) =>
    `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

  const tasksByPeriod = useMemo(
    () => ({
      manhã: tasks.filter(
        (task) =>
          new Date(task.startTime).getHours() >= 6 &&
          new Date(task.startTime).getHours() < 12,
      ),
      tarde: tasks.filter(
        (task) =>
          new Date(task.startTime).getHours() >= 12 &&
          new Date(task.startTime).getHours() < 18,
      ),
      noite: tasks.filter(
        (task) =>
          new Date(task.startTime).getHours() >= 18 ||
          new Date(task.startTime).getHours() < 6,
      ),
    }),
    [tasks],
  );

  const statusColors = {
    NOT_STARTED: "border-0 bg-gray-700",
    COMPLETED: "border-0 bg-green-700",
    IN_PROGRESS: "border-0 bg-yellow-700",
    UNREALIZED: "border-0 bg-red-700",
  };

  const handleUpdateTaskStatus = async (
    taskId: string,
    status: TasksStatus,
  ) => {
    try {
      await updateTaskStatus({ id: taskId, status });
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
    }
  };

  return (
    <>
      <Separator className="my-4" />

      <div className="flex flex-1 flex-col gap-3">
        <div className="space-y-5">
          {Object.entries(tasksByPeriod).map(
            ([period, tasks]) =>
              tasks.length > 0 && (
                <div key={period} className="flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 font-bold">
                    {period === "manhã" && <SunIcon size={12} />}
                    {period === "tarde" && <SunMoonIcon size={12} />}
                    {period === "noite" && <MoonIcon size={12} />}
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </div>

                  <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
                    {tasks.map((task, index) => (
                      <Card
                        key={task.id}
                        className={`flex flex-1 flex-col px-3 py-2`}
                      >
                        <div className="flex flex-col justify-between">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <Badge
                                className={`${statusColors[task.status]} h-2 w-16`}
                              />

                              <span className="text-sm text-gray-600">
                                #{index + 1}
                              </span>
                            </div>

                            <div>
                              <span className="truncate font-bold">
                                {task.name}
                              </span>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <ClockIcon size={12} />
                                  {formatTime(new Date(task.startTime))} -{" "}
                                  {formatTime(new Date(task.endTime))}
                                </div>

                                <TasksTypeBadge task={task} />
                              </div>
                            </div>
                          </div>

                          <div className="ml-auto pt-4">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Select
                                value={task.status}
                                onValueChange={(newStatus: TasksStatus) =>
                                  handleUpdateTaskStatus(task.id, newStatus)
                                }
                              >
                                <SelectTrigger className="w-fit gap-0.5 focus:ring-muted-foreground">
                                  <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                  {statuses.map((status) => (
                                    <SelectItem key={status} value={status}>
                                      {status === TasksStatus.NOT_STARTED &&
                                        "Não Iniciado"}
                                      {status === TasksStatus.IN_PROGRESS &&
                                        "Em Andamento"}
                                      {status === TasksStatus.COMPLETED &&
                                        "Concluído"}
                                      {status === TasksStatus.UNREALIZED &&
                                        "Não Realizado"}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground"
                              >
                                <ExternalLinkIcon />
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground"
                              >
                                <PencilIcon />
                              </Button>

                              <DeleteTaskButton />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </>
  );
};

export default DataItemsTasks;
